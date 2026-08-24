'use client';

import { cn } from '@/lib/utils';
import { MonoLabel, plexMono } from './shared';

function StatusDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block h-1.5 w-1.5 rounded-full bg-[#3DDC97] shadow-[0_0_8px_#3DDC97]',
        className
      )}
      aria-hidden="true"
    />
  );
}

function NodeCard({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center border border-white/15 bg-[#0C1118]/90 px-4 py-3',
        className
      )}
    >
      <MonoLabel className="text-white/80">{label}</MonoLabel>
    </div>
  );
}

function Connector({ className }: { className?: string }) {
  return (
    <div
      className={cn('bg-gradient-to-b from-[#1F5CFF]/80 to-[#1F5CFF]/20', className)}
      aria-hidden="true"
    />
  );
}

export function HeroDiagram() {
  return (
    <div
      className="relative overflow-hidden border border-white/10 bg-[#070B12] p-6 sm:p-8"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#1F5CFF]/20 blur-3xl" />

      <div className="relative flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 border border-[#1F5CFF]/40 bg-[#1F5CFF]/10 px-5 py-3">
          <StatusDot />
          <MonoLabel className="text-white">Private AI</MonoLabel>
        </div>

        <Connector className="h-8 w-px" />

        <div className="grid w-full grid-cols-3 gap-3">
          <NodeCard label="Data" />
          <NodeCard label="Models" />
          <NodeCard label="Agents" />
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <Connector className="mx-auto h-8 w-px" />
          <Connector className="mx-auto h-8 w-px" />
          <Connector className="mx-auto h-8 w-px" />
        </div>

        <div className="w-full border border-white/10 bg-white/[0.03] px-5 py-4 text-center">
          <MonoLabel className="text-white/55">Your systems</MonoLabel>
        </div>
      </div>
    </div>
  );
}

export function ArchitectureDiagram() {
  const rows = [
    ['Users', 'Systems', 'Data'],
    ['Private AI Layer'],
    ['Models', 'RAG', 'Agents'],
    ['Your infrastructure'],
  ];

  return (
    <div
      className="overflow-hidden border border-white/10 bg-[#070B12] p-5 sm:p-7"
      aria-hidden="true"
    >
      <MonoLabel className="mb-5 block text-white/40">Your company</MonoLabel>
      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.join('-')}
            className={cn(
              'grid gap-3',
              row.length === 1 ? 'grid-cols-1' : 'grid-cols-3'
            )}
          >
            {row.map((label) => (
              <div
                key={label}
                className={cn(
                  'border px-3 py-3 text-center',
                  label === 'Private AI Layer'
                    ? 'border-[#1F5CFF]/50 bg-[#1F5CFF]/10'
                    : 'border-white/10 bg-white/[0.03]'
                )}
              >
                <MonoLabel
                  className={
                    label === 'Private AI Layer' ? 'text-white' : 'text-white/70'
                  }
                >
                  {label}
                </MonoLabel>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataControlDiagram() {
  return (
    <div className="grid gap-4 lg:grid-cols-2" aria-hidden="true">
      <div className="border border-red-500/25 bg-red-500/5 p-5">
        <MonoLabel className="text-red-300">Cloud AI</MonoLabel>
        <p className={`${plexMono.className} mt-4 text-xs uppercase tracking-[0.18em] text-red-200/80`}>
          Internet → external model
        </p>
        <p className="mt-3 text-sm text-red-100/70">Data exposed</p>
      </div>
      <div className="border border-[#3DDC97]/30 bg-[#3DDC97]/5 p-5">
        <div className="flex items-center gap-2">
          <StatusDot />
          <MonoLabel className="text-[#B8F5D4]">Private AI</MonoLabel>
        </div>
        <p className={`${plexMono.className} mt-4 text-xs uppercase tracking-[0.18em] text-white/60`}>
          Your network
        </p>
        <p className="mt-3 text-sm text-white/70">Data → Model → App</p>
      </div>
    </div>
  );
}

export function TechStackVisual({
  layers,
}: {
  layers: Array<{ label: string; detail?: string }>;
}) {
  return (
    <div className="border border-white/10 bg-[#070B12]" aria-hidden="true">
      {layers.map((layer, index) => (
        <div
          key={layer.label}
          className={cn(
            'flex flex-col gap-1 border-b border-white/10 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between',
            index === 0 && 'bg-white/[0.03]'
          )}
        >
          <MonoLabel className="text-white/80">{layer.label}</MonoLabel>
          {layer.detail ? (
            <span className="text-sm text-white/45">{layer.detail}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function HybridDiagram({
  gateway,
  privateLabel,
  cloudLabel,
  privateNote,
  cloudNote,
}: {
  gateway: string;
  privateLabel: string;
  cloudLabel: string;
  privateNote: string;
  cloudNote: string;
}) {
  return (
    <div
      className="border border-white/10 bg-[#070B12] p-5 sm:p-7"
      aria-hidden="true"
    >
      <div className="mx-auto mb-6 max-w-xs border border-[#1F5CFF]/40 bg-[#1F5CFF]/10 px-4 py-3 text-center">
        <MonoLabel className="text-white">{gateway}</MonoLabel>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-white/10 bg-white/[0.03] p-5">
          <MonoLabel className="text-white">{privateLabel}</MonoLabel>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{privateNote}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-5">
          <MonoLabel className="text-white">{cloudLabel}</MonoLabel>
          <p className="mt-3 text-sm leading-relaxed text-white/55">{cloudNote}</p>
        </div>
      </div>
    </div>
  );
}

export function ProcessRail({
  steps,
}: {
  steps: Array<{ id: string; name: string }>;
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-5">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="border border-white/10 bg-[#070B12] px-4 py-5"
        >
          <MonoLabel className="text-[#7EA0FF]">
            {String(index + 1).padStart(2, '0')}
          </MonoLabel>
          <p className="mt-3 text-sm font-semibold tracking-wide text-white">
            {step.name}
          </p>
        </li>
      ))}
    </ol>
  );
}
