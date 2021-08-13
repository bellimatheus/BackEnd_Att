package ctr;

import java.util.ArrayList;

import vo.Jogo;
import voDAO.JogoDAO;

public class JogoProcess {
	public static ArrayList<Jogo> jogos;
	public static JogoDAO jd = new JogoDAO();
	
	
	//test
	public static void teste() {
		jogos = new ArrayList<>();
		jogos.add(new Jogo("A Plague Tale: Innocence","Acao e Aventura", "2020"));
		jogos.add(new Jogo("The Elder Scrolls V: Skyrim","RPG", "2019"));
		jogos.add(new Jogo("Crysis","Jogos de Tiro", "2007"));
		jogos.add(new Jogo("Fallout: New Vegas","RPG", "2010"));
		jogos.add(new Jogo("Hellblade: Senua's Sacrifice","Acao e Aventura", "2017"));
		jogos.add(new Jogo("Injustice 2","Luta", "2017"));

	}
	
	public static void abrir() {
		jogos = jd.abrir();
	}
	public static String salvar() {
		if (jd.salvar(jogos)) {
			return "<p> Salvo com sucesso </p>";
		}else {
			return "<p> Erro ao salvar </p>";
		}
		
	}
}
