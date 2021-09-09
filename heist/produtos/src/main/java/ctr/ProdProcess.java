package ctr;


import java.util.ArrayList;

import vo.Prod;
import voDAO.ProdDAO;

public class ProdProcess {
	
	public static ArrayList<Prod> prods;
	public static ProdDAO pd =  new ProdDAO();
	
	
	public static void teesst() {
		prods = new ArrayList<>();
		prods.add(new Prod("1", "Redragon Zeus 2", "Muito legal", "380", "1"));
		prods.add(new Prod("2", "Corsair Void Elite", "Muito legal", "650", "1"));
		prods.add(new Prod("3", "Razer Kraken", "Muito legal", "820", "1"));
		prods.add(new Prod("4", "Mouse" , "Muito legal", "1100", "1"));
	}
	
	public static void abrir() {
		prods = pd.abrir();
	}
	
	public static boolean salvar() {
		return pd.salvar(prods);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}