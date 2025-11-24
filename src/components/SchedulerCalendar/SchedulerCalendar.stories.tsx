import type { Meta, StoryObj } from '@storybook/react';
import { SchedulerCalendar } from './SchedulerCalendar';
import { StatusConsulta } from '@/types';

const meta = {
  title: 'Components/SchedulerCalendar',
  component: SchedulerCalendar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SchedulerCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SchedulerCalendar
      visualizacao="semana"
      onVisualizacaoChange={() => {}}
      onProximo={() => {}}
      onAnterior={() => {}}
      onHoje={() => {}}
      titulo="Novembro de 2024"
    >
      <SchedulerCalendar.Header />
      <SchedulerCalendar.Body>
        <div className="space-y-3">
          <SchedulerCalendar.Event
            id="1"
            dataHora={new Date('2024-11-20T10:00:00')}
            titulo="Rex - João Pedro Oliveira"
            subtitulo="Dr(a). Carlos Silva"
            status={StatusConsulta.AGENDADO}
          />
          <SchedulerCalendar.Event
            id="2"
            dataHora={new Date('2024-11-20T14:30:00')}
            titulo="Mimi - Maria Fernanda Costa"
            subtitulo="Dr(a). Maria Santos"
            status={StatusConsulta.REALIZADO}
          />
        </div>
      </SchedulerCalendar.Body>
    </SchedulerCalendar>
  ),
};

export const Empty: Story = {
  render: () => (
    <SchedulerCalendar
      visualizacao="dia"
      onVisualizacaoChange={() => {}}
      onProximo={() => {}}
      onAnterior={() => {}}
      onHoje={() => {}}
      titulo="20 de Novembro de 2024"
    >
      <SchedulerCalendar.Header />
      <SchedulerCalendar.Body>
        <p className="text-center text-gray-500 py-8">
          Nenhuma consulta agendada para este período
        </p>
      </SchedulerCalendar.Body>
    </SchedulerCalendar>
  ),
};
