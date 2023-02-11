import i01d from "../assets/img/icon/01d.png";
import i01n from "../assets/img/icon/01n.png";
import i02d from "../assets/img/icon/02d.png";
import i02n from "../assets/img/icon/02n.png";
import i03d from "../assets/img/icon/03d.png";
import i03n from "../assets/img/icon/03n.png";
import i04d from "../assets/img/icon/04d.png";
import i04n from "../assets/img/icon/04n.png";
import i09d from "../assets/img/icon/09d.png";
import i09n from "../assets/img/icon/09n.png";
import i10d from "../assets/img/icon/10d.png";
import i10n from "../assets/img/icon/10n.png";
import i11d from "../assets/img/icon/11d.png";
import i11n from "../assets/img/icon/11n.png";
import i13d from "../assets/img/icon/13d.png";
import i13n from "../assets/img/icon/13n.png";
import i50d from "../assets/img/icon/50d.png";
import i50n from "../assets/img/icon/50n.png";

function selectIcon(code) {
  return eval("i" + code);
}

selectIcon("01n");
export default selectIcon;
