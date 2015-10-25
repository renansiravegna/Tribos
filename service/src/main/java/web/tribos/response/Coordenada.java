package web.tribos.response;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "coordenada")
public class Coordenada {

	Double latitude;
	
	Double longitude;
	
	public Coordenada() {
	}

	public Coordenada(Double latitude, Double longitude) {
		this.latitude = latitude;
		this.longitude = longitude;
	}

	@XmlElement
	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	
	@XmlElement
	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
}