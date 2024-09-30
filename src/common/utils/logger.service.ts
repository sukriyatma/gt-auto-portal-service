import { Injectable, LoggerService, LogLevel, Scope } from "@nestjs/common";
import { trace, context as otelContext, Span } from "@opentelemetry/api";

@Injectable({ scope: Scope.TRANSIENT})
export class GAPLoggerService implements LoggerService {
    log(message: any, ...optionalParams: any[]) {
        let context = "unknow-context";
        if (optionalParams.length > 0) {
            context = optionalParams.at(0).constructor.name
        }
        this.injectTrace("LOG", message, context);
    }
    error(message: any, ...optionalParams: any[]) {
        let context = "unknow-context";
        if (optionalParams.length > 0) {
            context = optionalParams.at(0).constructor.name
        }
        this.injectTrace("ERROR", message, context);
    }
    warn(message: any, ...optionalParams: any[]) {
        let context = "unknow-context";
        if (optionalParams.length > 0) {
            context = optionalParams.at(0).constructor.name
        }
        this.injectTrace("WARN", message, context);
    }
    debug?(message: any, ...optionalParams: any[]) {
        let context = "unknow-context";
        if (optionalParams.length > 0) {
            context = optionalParams.at(0).constructor.name
        }
        this.injectTrace("DEBUG", message, context);
    }
    verbose?(message: any, ...optionalParams: any[]) {
        let context = "unknow-context";
        if (optionalParams.length > 0) {
            context = optionalParams.at(0).constructor.name
        }
        this.injectTrace("VERBOSE", message, context);
    }
    fatal?(message: any, ...optionalParams: any[]) {
        let context = "unknow-context";
        if (optionalParams.length > 0) {
            context = optionalParams.at(0).constructor.name
        }
        this.injectTrace("FATAL", message, context);
    }
    setLogLevels?(levels: LogLevel[]) {}
    
    private injectTrace(level: string, message: any, context?: string) {
        const span = trace.getSpan(otelContext.active());
        const traceId = span? span.spanContext().traceId: 'unknows-traceId';
        const consoleMessage = `[${level}] [traceId: ${traceId}] [${context}] ${message}`;
        
        this.addOtelEvent(span, consoleMessage);
        console.log(consoleMessage);
    }

    private addOtelEvent(activeSpan: Span, message: string) {
        activeSpan.addEvent(message);
    }
}