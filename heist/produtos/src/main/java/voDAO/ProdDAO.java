package voDAO;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import vo.Prod;

public class ProdDAO {

	private BufferedWriter bw;
	private BufferedReader br;
	String arquivo = "c:\\dbs\\produtos.csv";
	private ArrayList<Prod> prods;
	private Prod prod;

	public ArrayList<Prod> abrir() {
		prods = new ArrayList<>();
		try {
			br = new BufferedReader(new FileReader(arquivo));
			String row = "";
			while ((row = br.readLine()) != null) {
				prod = new Prod(row.split(";"));
				prods.add(prod);
			}

			br.close();
		} catch (FileNotFoundException e) {
			System.out.println("Erro ao tentar ler o arquivo");
		} catch (IOException e) {
			System.out.println("Erro ao tentar ler o arquivo" + e);
		}
		return prods;
	}

	public boolean salvar(ArrayList<Prod> prods) {
		try {
			bw = new BufferedWriter(new FileWriter(arquivo));
			for (Prod p : prods) {
				bw.write(p.toCSV());
			}
			bw.close();
			return true;
		} catch (IOException e) {
			System.out.println("Erro ao tentar gravar o arquivo" + e);
		}
		return false;

	}
}

