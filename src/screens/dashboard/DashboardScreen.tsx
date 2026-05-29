import { useEffect, useState } from 'react';

import { apiClient } from '../../services/api/client';
import type { DashboardSummary } from '../../services/api/types';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { StatCard } from '../../components/ui/StatCard';
import { Activity, Users, UserRound, Stethoscope, Bell } from 'lucide-react';

const defaultSummary: DashboardSummary = {
  usersCount: null,
  activePatients: 0,
  inactivePatients: 0,
  waitingTriages: 0,
  inProgressTriages: 0,
  unreadNotifications: 0,
  systemLoad: 'Parcial'
};

export function DashboardScreen() {
  const [summary, setSummary] = useState<DashboardSummary>(defaultSummary);

  useEffect(() => {
    let mounted = true;

    apiClient.getDashboardSummary().then((nextSummary) => {
      if (mounted) {
        setSummary(nextSummary);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Usuários ativos" value={summary.usersCount === null ? 'Restrito' : String(summary.usersCount)} note="Perfis cadastrados para as áreas administrativa e clínica." />
        <StatCard label="Pacientes ativos" value={String(summary.activePatients)} note="Registros disponíveis para consultas e acompanhamento." />
        <StatCard label="Triagens aguardando" value={String(summary.waitingTriages)} note="Pacientes priorizados e aguardando atendimento." />
        <StatCard label="Notificações abertas" value={String(summary.unreadNotifications)} note="Eventos operacionais ainda não marcados como lidos." />
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl gap-2">
            <Badge label="Operação assistencial" tone="soft" />
            <h2 className="text-2xl font-black text-ink">Fluxo distribuído do HealthSys em operação</h2>
            <p className="text-sm leading-6 text-cocoa">
              O painel consolida pacientes, triagens e eventos assíncronos para apoiar a rotina de recepção, administração e equipe clínica.
            </p>
          </div>

          <section className="rounded-3xl border border-stone bg-sand px-5 py-4">
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-clay flex items-center gap-2">
              <Activity size={14} />
              Estado do sistema
            </div>
            <div className="mt-2 text-lg font-black text-ink flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              {summary.systemLoad}
            </div>
          </section>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="grid gap-3">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-clay flex items-center gap-2">
              <UserRound size={16} /> Pacientes
            </div>
            <h3 className="text-xl font-black text-ink">Cadastro preservado e rastreável</h3>
            <p className="text-sm leading-6 text-cocoa">
              Há {summary.activePatients} pacientes ativos e {summary.inactivePatients} registros inativos mantidos para histórico, sem
              exclusão física.
            </p>
          </div>
        </Card>

        <Card>
          <div className="grid gap-3">
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-clay flex items-center gap-2">
              <Stethoscope size={16} /> Triagem
            </div>
            <h3 className="text-xl font-black text-ink">Prioridades em acompanhamento</h3>
            <p className="text-sm leading-6 text-cocoa">
              Existem {summary.waitingTriages} triagens aguardando e {summary.inProgressTriages} em atendimento. Use o módulo de triagem
              para atualizar o andamento clínico.
            </p>
            <EmptyState
              title="Comunicação operacional"
              description="As notificações refletem eventos recebidos da comunicação assíncrona entre os serviços."
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
