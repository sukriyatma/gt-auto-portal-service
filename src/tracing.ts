import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto"
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { NestInstrumentation } from "@opentelemetry/instrumentation-nestjs-core";
import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import "dotenv/config"

const isProduction = process.env.NODE_ENV === 'production'

const traceExporterJeager = new OTLPTraceExporter({
    url: 'http://localhost:14268/api/traces'
});

const traceExporter = isProduction
    ? new OTLPTraceExporter()
    : traceExporterJeager

export const otelSDK = new NodeSDK({
    resource: new Resource({
        'service.name': 'gaportal-service-otel'   
    }),
    traceExporter: traceExporter,
    spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new NestInstrumentation()
    ],
});

process.on('SIGTERM', () => {
    otelSDK
        .shutdown()
        .then(
            () => console.log("OpenTelemetry SDK shut down successfully"),
            (err) => console.log("Error shutting down OpenTelemetry SDK", err)
        )
        .finally(() => process.exit(0));
});