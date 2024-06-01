package http;

import java.util.HashMap;

public class Session {
	private HashMap<String, Object> table = null;
	private static Session instance = null;
	
	public Session() { //new Session형태로 생성자를 호출할 경우, 기존 방식으로 객체를 별도로 생성
		table = new HashMap<String, Object>();
		
		
	}

	public static Session getInstance() { //호출시 공유 객체 생성
		if(instance == null) {
			instance = new Session();
		}
		
		//DBConnection_maria test = new DBConnection_maria();
		//DBConnection_maria.connectDB();
		
		return instance;
	}
	
	public void set(String key, Object val) {
		table.put(key, val);
	}

	public Object get(String key) {
		return table.get(key);
	}

	public Object remove(String key) {
		return table.remove(key);
	}
}
