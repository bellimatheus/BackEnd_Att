package voDAO;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import vo.Jogo;

public class JogoDAO {
	private BufferedReader br;
	private BufferedWriter bw;
	private ArrayList<Jogo> jogos;
	private Jogo jogo;
	private String arquivo = "C:\\bds\\jogos.csv";
	
	public boolean salvar(ArrayList<Jogo> jogos) {
		try { bw = new BufferedWriter(new FileWriter(arquivo, false));
			for(Jogo j : jogos) {
				bw.write(j.toCSV());
			}
			bw.close();
			return true;
		}catch(IOException e) {
			System.out.println("Erro ao gravar arquivo" + e);
			return false;
		}
	}
	
	public ArrayList<Jogo> abrir() {
		jogos = new ArrayList<>();
		try {
			br = new BufferedReader(new FileReader(arquivo));
			String linha = null;
			while ((linha = br.readLine()) != null) {
				jogo = new Jogo(linha.split(";"));
				jogos.add(jogo);
			}
			br.close();
		} catch (FileNotFoundException e) {
			System.out.println("Arquivo n�o encontrado " + e);
		} catch (IOException e) {
			System.out.println("Erro ao ler arquivo " + e);
		}
		return jogos;
	}
	
}
