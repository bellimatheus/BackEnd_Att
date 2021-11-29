package controll;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import model.Fun;

public class FunProcess {
	private Connection con;
	private ResultSet rs;

	public FunProcess () {
		this.con = new ConnectionDB().getConnection();
	}
	
	public boolean criar(Fun fun) {
		String query = "INSERT INTO funcionarios VALUES (DEFAULT, ?, ?, ?)";
		try {
			PreparedStatement ps = con.prepareStatement(query);
			
			ps.setString(1, fun.getNomeCompleto());
			ps.setString(2, fun.getDataDesligamento());
			ps.setFloat(3, fun.getUltimoSalario());
			
			if(ps.executeUpdate() > 0) {
				rs = ps.getGeneratedKeys();
				rs.next();
				fun.setMatricula(rs.getInt(1));
				con.close();
				return true;
			}else {}
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
			
		}
		return false;
		
	}
	
	public JSONArray ler() {
		JSONArray arr = new JSONArray();
		String query = "SELECT * FROM funcionarios";

		try {

			PreparedStatement ps = con.prepareStatement(query);
			rs = ps.executeQuery();
			while (rs.next()) {
				JSONObject obj = new JSONObject();
				obj.put("matricula", rs.getInt(1));
				obj.put("nomeCompleto", rs.getString(2));
				obj.put("dataDesligamento", rs.getString(3));
				obj.put("ultimoSalario", rs.getInt(4));
				arr.put(obj);

			}
			con.close();

		} catch (SQLException e) {
			e.printStackTrace();

		} catch (JSONException e) {
			e.printStackTrace();

		}
		return arr;

	}

	public boolean apagar(int matricula) {
		String query = "DELETE FROM funcionarios WHERE matricula = ?";
		
		try {
			PreparedStatement ps = con.prepareStatement(query);
			ps.setInt(1, matricula);
			if(ps.executeUpdate() > 0) {
				con.close();
				return true;
			}
			con.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
			
		}
		
		return false;
		
	}

	public String alt (Fun fun) {
		String query = "UPDATE clientes SET nome = ?, valor = ?, status = ? WHERE id = ?";
		
		try {
			PreparedStatement ps = con.prepareStatement(query);
			
			ps.setInt(1, fun.getMatricula());
			ps.setString(2, fun.getNomeCompleto());
			ps.setString(3, fun.getDataDesligamento());
			ps.setFloat(4, fun.getUltimoSalario());
			
			if(ps.executeUpdate() > 0) {
				con.close();
				return "Sucesso";
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return e.toString();
			
		}
		
		return "Falha ao alterar";
	}
}
