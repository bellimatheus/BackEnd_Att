<%@page import="vo.Jogo"%>
<%@page import="ctr.JogoProcess"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Listar os jogos adicionados</title>
</head>
<body>
		<table>
		<tr>
			<th>Nome</th>
			<th>Gênero</th>
			<th>Ano</th>
		</tr>
		<%JogoProcess.teste();
		for (Jogo j : JogoProcess.jogos){
			out.print(j.toHTML());
		}
		out.print(JogoProcess.salvar());
		
		%>
	</table>
</body>
</html>