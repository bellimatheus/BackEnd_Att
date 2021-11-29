package view;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import controller.FunProcess;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.Fun;


@WebFilter("/funcionario")
public class FunHttp extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		
		PrintWriter pw = resp.getWriter();
		
		try {
			JSONObject obj = new JSONObject();
			
			String nomeCompleto = obj.getString("nomeCompleto");
			String dataDesligamento = obj.getString("dataDesligamento");
			int ultimoSalario = obj.getInt("ultimoSalario");
			
			Fun f = new Fun();
			
			f.setNomeCompleto(nomeCompleto);
			f.setDataDesligamento(dataDesligamento);
			f.setUltimoSalario(ultimoSalario);
			
			FunProcess fp = new FunProcess();
			
			if (fp.criar(f)) {
				obj.put("matricula", f.getMatricula());
				pw.write(obj.toString());
				
			}else {
				resp.setStatus(401); 
			}
			
			
		}catch(JSONException e) {
			e.printStackTrace();
		}
		
	}
	

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		PrintWriter pw = resp.getWriter();
		
		FunProcess ap = new FunProcess();
		
		JSONArray arr = ap.ler();
		
		pw.write(arr.toString());
	}
	

	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		PrintWriter pw = resp.getWriter();
		String matri = req.getParameter("matricula");
		int matricula = Integer.parseInt(matri);
		
		FunProcess ap = new FunProcess();
		
		if(ap.dele(matricula)) {
			pw.write("{\"id\":"+matricula+"}");
		}else {
			resp.setStatus(401);
		}
	}
	

	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

	}
}
