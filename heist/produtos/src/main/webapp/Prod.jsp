<%@page import="vo.Prod"%>
<%@page import="ctr.ProdProcess"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Produtos</title>
</head>
<body>
	<%
		Prod prod;
		String id = request.getParameter("id");
		String nome = request.getParameter("nome");
		String desc = request.getParameter("descricao");
		String val = request.getParameter("valor");
		String qntd = request.getParameter("qntd");
		ProdProcess.abrir();
	%>
		<form method="post">
		<label>ID</label><input type="number" name="id" required>
		<label>Nome</label><input type="text" name="descricao" required>
		<label>Descrição</label><input type="text" name="valor" required> 
		<label>Valor</label><input type="number" name="valor" required> 
		<label>Quantidade</label><input type="number" name="valor" required> 
		
		<input type="reset" value="Limpar campos">
		<input type="submit" value="Enviar cadastro">
	</form>
	<%
		
		if(id != null && nome != null && desc != null && val != null && qntd != null){//Checar se chegaram dados
			prod = new Prod(id, nome, desc, val, qntd);
			ProdProcess.prods.add(prod); 
			out.print(ProdProcess.salvar()); 
			response.sendRedirect("listar.jsp");
		}else{
			out.print("<p>Aguardando dados</p>");
		}
	%>
		<table>
			<tr>
				<th>ID</th>
				<th>Nome</th>
				<th>Descrição</th>
				<th>Valor</th>
				<th>Quantidade</th>
			</tr>
		<%

		for (Prod pd : ProdProcess.prods) {
			out.print(pd.toHTML());
		}

		%>
		</table>
</body>
</html>