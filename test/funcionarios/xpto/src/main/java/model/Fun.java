package model;

public class Fun {
	private int matricula;
	private String nomeCompleto;
	private String dataDesligamento;
	private int ultimoSalario;
	
	public Fun(){

	}
	
	
	public Fun(String nomeCompleto, String dataDesligamento, int ultimoSalario) {
		this.nomeCompleto = nomeCompleto;
		this.dataDesligamento = dataDesligamento;
		this.ultimoSalario = ultimoSalario;
	}


	public int getMatricula() {
		return matricula;
	}


	public String getNomeCompleto() {
		return nomeCompleto;
	}


	public String getDataDesligamento() {
		return dataDesligamento;
	}


	public int getUltimoSalario() {
		return ultimoSalario;
	}



	public void setMatricula(int matricula) {
		this.matricula = matricula;
	}


	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}


	public void setDataDesligamento(String dataDesligamento) {
		this.dataDesligamento = dataDesligamento;
	}


	public void setUltimoSalario(int ultimoSalario) {
		this.ultimoSalario = ultimoSalario;
	}


	
	public float calc() {
		float calculo = 0; 
		
		if(this.ultimoSalario < 1981) {
			calculo = 0;

		}else if(this.ultimoSalario >1981) {
			calculo = (float) (this.ultimoSalario * 00.75);
			
		}else if (this.ultimoSalario > 2941){
			calculo = (float) (this.ultimoSalario * 0.150);
			
		}else if (this.ultimoSalario > 3903) {
			calculo = (float) (this.ultimoSalario * 0.225);
			
		}else if(this.ultimoSalario > 4854) {
			calculo = (float) (this.ultimoSalario * 0.275);
		}
		return calculo;
		
		
	}
}

