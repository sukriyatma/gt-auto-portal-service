import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { trace, context as otelContext } from "@opentelemetry/api";
import { map, Observable } from "rxjs";

export class TraceInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const currentSpan = trace.getSpan(otelContext.active());
        return next.handle().pipe(
            map( (data) => {
                const traceId = currentSpan? currentSpan.spanContext().traceId: null;
                return {
                    ...data,
                    traceId,
                }
            })
        )
    }
}