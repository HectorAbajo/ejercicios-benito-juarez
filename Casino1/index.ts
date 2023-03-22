import { Casino } from "./Casino";
import { JuegoDeCasino } from "./JuegosCasino";
import { Ruleta } from "./Ruleta";
import { Zona } from "./EnumZona";
import { TragaMonedas } from "./Tragamonedas";

const casino1: Casino = new Casino("Loteria Y Casinos","Calle 46 nº581(La Plata)",0o2214121100,new Date("2/20/1965"))
const juego1: JuegoDeCasino = new JuegoDeCasino(new Date("12/25/1992"),new Date("2/11/1998"))
// juego1.getInfo()
const ruleta1: Ruleta = new Ruleta(new Date("2/23/1996"),new Date("12/25/2000"),Zona.Pleno,casino1)
ruleta1.apostar(1500,ruleta1)
ruleta1.getInfo()
// const tragaMonedas1: TragaMonedas = new TragaMonedas()
// tragaMonedas1.apostar(500)
