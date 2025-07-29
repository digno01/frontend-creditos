import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditoService } from '../../services/credito.service';
import { Credito } from '../../models/credito.model';

@Component({
  selector: 'app-consulta-creditos',
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-creditos.component.html',
  styleUrl: './consulta-creditos.component.css'
})
export class ConsultaCreditosComponent {
  tipoConsulta: 'nfse' | 'credito' = 'nfse';
  numeroNfse: string = '';
  numeroCredito: string = '';
  creditos: Credito[] = [];
  creditoUnico: Credito | null = null;
  loading: boolean = false;
  erro: string = '';

  constructor(private creditoService: CreditoService) {}

  onTipoConsultaChange() {
    this.limparResultados();
  }

  consultar() {
    if (this.tipoConsulta === 'nfse' && !this.numeroNfse.trim()) {
      this.erro = 'Por favor, informe o número da NFS-e';
      return;
    }

    if (this.tipoConsulta === 'credito' && !this.numeroCredito.trim()) {
      this.erro = 'Por favor, informe o número do crédito';
      return;
    }

    this.loading = true;
    this.erro = '';
    this.limparResultados();

    if (this.tipoConsulta === 'nfse') {
      this.creditoService.getCreditosByNfse(this.numeroNfse.trim()).subscribe({
        next: (creditos) => {
          this.creditos = creditos;
          this.loading = false;
          if (creditos.length === 0) {
            this.erro = 'Nenhum crédito encontrado para esta NFS-e';
          }
        },
        error: (error) => {
          this.loading = false;
          if (error.status === 404) {
            this.erro = 'Nenhum crédito encontrado para esta NFS-e';
          } else {
            this.erro = 'Erro ao consultar créditos. Verifique se a API está funcionando.';
          }
          console.error('Erro:', error);
        }
      });
    } else {
      this.creditoService.getCreditoByNumero(this.numeroCredito.trim()).subscribe({
        next: (credito) => {
          this.creditoUnico = credito;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          if (error.status === 404) {
            this.erro = 'Registro não encontrado';
          } else {
            this.erro = 'Erro ao consultar crédito. Verifique se a API está funcionando.';
          }
          console.error('Erro:', error);
        }
      });
    }
  }

  limparResultados() {
    this.creditos = [];
    this.creditoUnico = null;
    this.erro = '';
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarData(data: string): string {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
  }

  formatarPercentual(valor: number): string {
    return valor.toFixed(2) + '%';
  }
}
