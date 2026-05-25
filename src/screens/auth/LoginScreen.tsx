import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { BrandMark } from '../../components/layout/BrandMark';

export function LoginScreen() {
  const navigate = useNavigate();
  const { signIn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      navigate('/dashboard');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Nao foi possivel autenticar');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8efe3]">
      <div className="relative bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.24),transparent_24%),linear-gradient(135deg,#6f2d1a_0%,#b85600_54%,#e98936_100%)] px-5 py-6 lg:hidden">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/[0.15]" />
        <BrandMark contrast />
        <div className="mt-5 max-w-sm">
          <Badge label="Acesso hospitalar" tone="soft" />
          <h1 className="mt-3 text-2xl font-black leading-tight text-white">Operacao clinica distribuida em tempo real.</h1>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-88px)] flex-col lg:min-h-screen lg:flex-row">
        <section className="relative hidden flex-1 flex-col overflow-hidden border-r border-[#d7c5b5] bg-[radial-gradient(circle_at_20%_14%,rgba(255,255,255,0.24),transparent_24%),linear-gradient(135deg,#5c2415_0%,#9f4012_48%,#e98936_100%)] px-8 py-10 shadow-soft lg:flex">
          <div className="absolute -left-10 top-20 h-44 w-44 rounded-full border border-white/20" />
          <div className="absolute bottom-8 right-8 h-56 w-56 rounded-full bg-white/10 blur-sm" />
          <div className="absolute right-16 top-16 h-24 w-24 rounded-[2rem] border border-white/20 bg-white/10 rotate-12" />

          <BrandMark contrast />

          <div className="relative mt-12 max-w-3xl">
            <Badge label="Gestao Hospitalar Distribuida" tone="soft" />
            <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white xl:text-6xl">
              Uma central unica para admissao, triagem e comunicacao assistencial.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
              O HealthSys organiza pacientes, usuarios, classificacao de risco e notificacoes clinicas em uma experiencia integrada para equipes administrativas e assistenciais.
            </p>
          </div>

          <div className="relative mt-10 grid max-w-3xl gap-3 xl:grid-cols-3">
            {[
              ['Admissao', 'Cadastro e atualizacao de pacientes com rastreabilidade.'],
              ['Triagem', 'Priorizacao clinica e acompanhamento do primeiro atendimento.'],
              ['Alertas', 'Eventos assincronos para manter a equipe informada.']
            ].map(([title, description]) => (
              <div key={title} className="rounded-[1.75rem] border border-white/20 bg-white/[0.12] p-5 backdrop-blur">
                <div className="text-sm font-black uppercase tracking-[0.2em] text-white">{title}</div>
                <p className="mt-3 text-sm leading-6 text-white/80">{description}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-auto max-w-xl rounded-[2rem] border border-white/20 bg-[#2d140d]/[0.35] p-5 backdrop-blur">
            <div className="text-xs font-bold uppercase tracking-[0.28em] text-white/70">Ambiente seguro</div>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Entre com uma conta cadastrada. O acesso ao painel respeita perfil de usuario, JWT ativo e logout com revogacao de sessao.
            </p>
          </div>
        </section>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-0">
          <Card className="w-full max-w-[31rem] justify-center border-[#e2d3c4] bg-white/95 shadow-[0_24px_70px_rgba(55,31,18,0.16)]">
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Badge label="Acesso restrito" tone="warning" />
                <h1 className="text-4xl font-black tracking-[-0.04em] text-ink">Entrar no HealthSys</h1>
                <p className="text-sm leading-6 text-cocoa">
                  Use suas credenciais institucionais para acessar pacientes, triagens, notificacoes e administracao de usuarios.
                </p>
              </div>

              <Input label="E-mail corporativo" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nome@hospital.com" type="email" autoComplete="username" />
              <Input label="Senha" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Digite sua senha" type="password" autoComplete="current-password" />

              {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div> : null}

              <Button label={isSubmitting ? 'Validando acesso' : 'Acessar painel'} type="submit" disabled={isSubmitting || !email || !password} fullWidth />

              <div className="rounded-3xl border border-stone bg-panelSoft px-4 py-4">
                <div className="text-xs font-bold uppercase tracking-[0.28em] text-clay">Seguranca operacional</div>
                <p className="mt-2 text-sm leading-6 text-cocoa">
                  A sessao e validada pelo servico de identidade e as funcionalidades sao exibidas conforme o perfil de acesso.
                </p>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
