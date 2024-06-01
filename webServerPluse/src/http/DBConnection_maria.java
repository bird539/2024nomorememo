package http;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
//https://byul91oh.tistory.com/144
//https://www.youtube.com/watch?v=91QGnY8K-cc&ab_channel=IT%ED%95%A5%EA%B8%B0
public class DBConnection_maria {
	private static final String DB_DRIVER_CLASS = "org.mariadb.jdbc.Driver";
	private static final String DB_URL = "jdbc:mariadb://localhost:3305/exweb";
	private static final String DB_USERNAME = "root";
	private static final String DB_PASSWORD = "1234";
	private static Connection conn;
	PreparedStatement pstmt = null;

	
	public static void connectDB() {
		try {
			
			Class.forName(DB_DRIVER_CLASS);
			//Connection connection = DriverManager.getConnection(DB_URL, DB_USERNAME, DB_PASSWORD);
			//System.out.println("연결성공");
			//Connection connection =null;
			//Statement stmt = null;

			StringBuffer sql = new StringBuffer();
			sql.append("select * from \"joininfo\"");
			Connection connection = DriverManager.getConnection(
				    "jdbc:mariadb://localhost:3305/exweb",
				    "root", "1234"
			);
			if(connection != null) {System.out.println(connection);}
			
			try (PreparedStatement statement = connection.prepareStatement("""
		            SELECT id, pw
		            FROM joininfo
		        """)) {
		    ResultSet resultSet = statement.executeQuery();
		    while (resultSet.next()) {
		        String val1 = resultSet.getString("id");
		        String val12 = resultSet.getString("pw");; 
		        System.out.println(val1 + "/ " + val12);

		    }
		}
			
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			System.out.println("드라이브 로딩 실패");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("DB 연결 실패");
			e.printStackTrace();
		}
	}

	/*
	public static void main(String[] args) {
		DBConnection_maria test = new DBConnection_maria();
		test.connectDB();
	}*/
}
