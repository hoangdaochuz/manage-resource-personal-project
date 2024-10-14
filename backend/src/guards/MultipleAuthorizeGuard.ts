import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Injectable()
export class MultipleAuthorizeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}
  public canActivate(context: ExecutionContext): Observable<boolean> {
    const allowedGuards =
      this.reflector.get<Type<CanActivate>[]>(
        'multipleGuardsReferences',
        context.getHandler(),
      ) || [];

    const guards = allowedGuards.map((guardReference) =>
      this.moduleRef.get<CanActivate>(guardReference),
    );

    if (guards.length === 0) {
      return of(true);
    }

    if (guards.length === 1) {
      return guards[0].canActivate(context) as Observable<boolean>;
    }

    const checks$: Observable<boolean>[] = guards.map((guard) =>
      (guard.canActivate(context) as Observable<boolean>).pipe(
        catchError((err) => {
          if (err instanceof UnauthorizedException) {
            return of(false);
          }
          throw err;
        }),
      ),
    );

    return forkJoin(checks$).pipe(
      map((results: boolean[]) => results.every(Boolean)),
    );
  }
}
