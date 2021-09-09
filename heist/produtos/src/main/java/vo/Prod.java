package vo;

import java.util.Objects;

public class Prod {
	private int id;
	private String nome;
	private String descricao;
	private float valor;
	private int qntd;

	
	public Prod() {
	}
	
	public Prod(String id) {
		this.id = Integer.parseInt(id);
	}

	public Prod(String id, String nome, String descricao, String valor, String qntd) {
		this.id = Integer.parseInt(id);
		this.nome = nome;
		this.descricao = descricao;
		this.valor = Float.parseFloat(valor);
		this.qntd = Integer.parseInt(qntd);
	}

	public Prod(String[] csv) {
		this.id = Integer.parseInt(csv[0]);
		this.nome = csv[1];
		this.descricao = csv[2];
		this.valor = Float.parseFloat(csv[3]);
		this.qntd = Integer.parseInt(csv[4]);
	}

	public int getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public float getValor() {
		return valor;
	}

	public int getQntd() {
		return qntd;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public void setValor(float valor) {
		this.valor = valor;
	}

	public void setQntd(int qntd) {
		this.qntd = qntd;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Prod other = (Prod) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		return id + "\t" + nome + "\t" + descricao + "\t" + valor + "\t" + qntd+ "\n";
	}
	
	public String toCSV() {
		return id + ";" + nome + ";" + descricao + ";" + valor + ";" + qntd+ "\r\n";
	}
	
	public String toHTML() {
		return "<tr><td>" + id + "<\td><td>" + nome + "<\td><td>" + descricao + "<\td><td>" + valor + "<\td><td>" + qntd + "<\td></tr>";
	}
	
	public double getSubtotal() {
		valor = valor * qntd;
		return valor;
	}
	
	
}
