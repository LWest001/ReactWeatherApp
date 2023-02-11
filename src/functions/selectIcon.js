import i01d from "/icon/01d.png";
import i01n from "/icon/01n.png";
import i02d from "/icon/02d.png";
import i02n from "/icon/02n.png";
import i03d from "/icon/03d.png";
import i03n from "/icon/03n.png";
import i04d from "/icon/04d.png";
import i04n from "/icon/04n.png";
import i09d from "/icon/09d.png";
import i09n from "/icon/09n.png";
import i10d from "/icon/10d.png";
import i10n from "/icon/10n.png";
import i11d from "/icon/11d.png";
import i11n from "/icon/11n.png";
import i13d from "/icon/13d.png";
import i13n from "/icon/13n.png";
import i50d from "/icon/50d.png";
import i50n from "/icon/50n.png";

function selectIcon(code) {
  //   return eval("i" + code);
  return `/icon/i${code}.png`;
}

selectIcon("01n");
export default selectIcon;
