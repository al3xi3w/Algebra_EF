// Teoría por semana. Cada bloque cita la página del PDF en Clases/ (src).
// Notación corta (la expande app.js): \mat{a,b;c,d} = matriz, \col{a,b,c} = vector columna.
const R = String.raw;

const PDFS = {
  s06: { file: 'S06_Espacio_Euclidiano_Subespacios_LI_Base_Dimension.pdf', name: 'S06 · Espacio euclidiano, subespacios, LI, base y dimensión' },
  s07: { file: 'S07_Espacio_Nulo_Fila_Columna_Rango_Nulidad.pdf', name: 'S07 · Espacio nulo, fila, columna y rango-nulidad' },
  s09: { file: 'S09_Transformaciones_Lineales.pdf', name: 'S09 · Transformaciones lineales' },
  s10: { file: 'S10_Transformaciones_Comunes_Nucleo_Imagen.pdf', name: 'S10 · Transformaciones comunes, núcleo e imagen' },
  s11: { file: 'S11_Valores_Vectores_Propios.pdf', name: 'S11 · Valores y vectores propios' },
  s12: { file: 'S12_Diagonalizacion_Sistemas_Dinamicos.pdf', name: 'S12 · Diagonalización y sistemas dinámicos discretos' },
  s13: { file: 'S13_Producto_Interno_Gram_Schmidt_Diag_Ortogonal.pdf', name: 'S13 · Producto interno, Gram-Schmidt, diagonalización ortogonal' },
  s14: { file: 'S14_QR_SVD.pdf', name: 'S14 · Factorización QR y SVD' },
  s15: { file: 'S15_Repaso_Teoria.pdf', name: 'S15 · Repaso de teoría' },
};

const BANCOS = {
  ef: { file: 'Ejercicios_Algebra/NuevAntiguaRepasoEF.pdf', name: 'Banco de entrenamiento — Examen Final M1 (31 problemas + formulario)' },
  mar: { file: 'Ejercicios_Algebra/Algebra lineal - ejercicios maraton.pdf', name: 'Banco de ejercicios maratón (V/F, procedimental, aplicación)' },
};

const THEORY = [
{
  id: 's06', wk: 'Semana 6', title: 'Espacio euclidiano, subespacios, combinación lineal, LI, base y dimensión',
  intro: 'La base de todo el curso: qué es un subespacio y cómo decidir si unos vectores son independientes o generan un espacio. Todo se reduce a resolver un sistema.',
  blocks: [
    { h: 'El espacio $\\mathbb{R}^m$', src: [6, 7, 8], html: R`
      <p>$\mathbb{R}^m=\{(x_1,\dots,x_m): x_i\in\mathbb{R}\}$ con dos operaciones: <b>suma</b> componente a componente y <b>producto por escalar</b> $\lambda x=(\lambda x_1,\dots,\lambda x_m)$. Con ellas cumple los 8 axiomas de espacio vectorial (asociativa, conmutativa, existe $0$, existe opuesto, etc.).</p>
      <p>Un vector se escribe como fila $(x_1,\dots,x_m)$ o como columna $[x_1,\dots,x_m]^\top$.</p>` },
    { h: 'Subespacio vectorial', src: [9, 10], html: R`
      <p>$V\subset\mathbb{R}^m$ es <b>subespacio</b> si cumple las tres condiciones:</p>
      <ol><li>$0\in V$</li><li>$x,y\in V\Rightarrow x+y\in V$ (cerrado bajo suma)</li><li>$\alpha\in\mathbb{R},\ x\in V\Rightarrow \alpha x\in V$ (cerrado bajo escalar)</li></ol>
      <div class="box"><b>Ejemplo de clase:</b> $L=\{(t,t):t\in\mathbb{R}\}$ es subespacio de $\mathbb{R}^2$: contiene $(0,0)$, $(u_1,u_1)+(v_1,v_1)=(u_1+v_1,u_1+v_1)\in L$ y $\alpha(u_1,u_1)=(\alpha u_1,\alpha u_1)\in L$.</div>
      <div class="box warn"><b>Truco:</b> si $0\notin V$, ya no es subespacio (p. ej. la recta $y=x+1$).</div>` },
    { h: 'Combinación lineal', src: [14, 15, 16, 18, 20], html: R`
      <p>$v$ es <b>combinación lineal</b> de $u_1,\dots,u_n$ si existen escalares (pesos) con $v=\alpha_1u_1+\dots+\alpha_nu_n$.</p>
      <p>Equivale a: con $A=[u_1\,|\,\dots\,|\,u_n]$, el sistema $Ax=v$ es <b>consistente</b>. Los pesos son la solución $x$.</p>
      <p>Los pesos no siempre son únicos: $0=(-3)u_1+1\cdot u_2$ y también $0=1\cdot u_1-\tfrac13 u_2$ cuando $u_2=3u_1$.</p>` },
    { h: 'Independencia lineal (LI)', src: [22, 23, 25], html: R`
      <p>$u_1,\dots,u_n$ son <b>linealmente independientes</b> si $[u_1|\dots|u_n]\,\alpha=0$ tiene <b>solución única</b> (la trivial $\alpha=0$). Si no, son <b>dependientes</b> (LD).</p>
      <p>En la práctica: escalona $A=[u_1|\dots|u_n]$. Si $\operatorname{rango}(A)=n$ (un pivote por columna) → LI. Si $\operatorname{rango}(A)&lt;n$ → LD.</p>
      <div class="box">Ejemplo de clase: $(1,2,10),(5,10,50),(4,8,40)$ escalonan a una sola fila no nula: rango $1&lt;3$ → LD.</div>` },
    { h: 'Espacio generado, base y dimensión', src: [28, 29, 32, 33], html: R`
      <p>$\operatorname{Gen}\{v_1,\dots,v_n\}$ = todas las combinaciones lineales de esos vectores.</p>
      <p>$\{v_1,\dots,v_r\}$ es <b>base</b> de $V$ si (1) son LI y (2) generan $V$. La <b>dimensión</b> $\dim V$ es el número de vectores de cualquier base.</p>
      <ul><li>$\dim\mathbb{R}^n=n$; en $\mathbb{R}^n$ hay a lo más $n$ vectores LI.</li>
      <li>$n$ vectores LI en $\mathbb{R}^n$ siempre forman base (equivale a $\det[v_1|\dots|v_n]\neq0$).</li>
      <li>La dimensión no cambia al cambiar de base.</li></ul>` },
  ]
},
{
  id: 's07', wk: 'Semana 7', title: 'Espacios fundamentales de una matriz y teorema de rango-nulidad',
  intro: 'Cada matriz tiene cuatro espacios asociados. Se calculan todos escalonando, y sus dimensiones están amarradas por el teorema de rango-nulidad (que vuelve en núcleo/imagen y en multiplicidad geométrica).',
  blocks: [
    { h: 'Espacio nulo $N(A)$', src: [6, 7, 8], html: R`
      <p>$N(A)=\{x\in\mathbb{R}^n: Ax=0\}$: todas las soluciones del sistema homogéneo.</p>
      <p><b>Cómo se calcula:</b> escalona $A$ (forma reducida), despeja las variables pivote en función de las libres y escribe $x$ como combinación de vectores, uno por variable libre. Esos vectores son una base de $N(A)$.</p>
      <p>Si la forma reducida tiene $r$ filas no nulas y hay $n$ incógnitas → hay $n-r$ variables libres.</p>` },
    { h: 'Espacio fila y espacio columna', src: [9, 14, 15, 21, 24, 25, 29], html: R`
      <p>$\operatorname{row}(A)=\operatorname{Gen}\{\text{filas de }A\}$ y $\operatorname{col}(A)=\operatorname{Gen}\{\text{columnas de }A\}$.</p>
      <div class="box warn"><b>Propiedad clave:</b> las operaciones elementales fila <b>no cambian</b> $\operatorname{row}(A)$, pero <b>sí cambian</b> $\operatorname{col}(A)$. Por eso:
      <ul><li>Base de $\operatorname{row}(A)$: las filas no nulas de la forma escalonada $R$.</li>
      <li>Base de $\operatorname{col}(A)$: las columnas <b>de la matriz original $A$</b> que están en posición pivote.</li></ul></div>
      <p>Ej. de clase: $A=\mat{1,4;2,8;1,4}\sim\mat{1,4;0,0;0,0}$: $\operatorname{row}(A)=\operatorname{Gen}\{(1,4)\}$, $\operatorname{col}(A)=\operatorname{Gen}\{(1,2,1)\}$, pero $\operatorname{col}(R)=\operatorname{Gen}\{(1,0,0)\}\neq\operatorname{col}(A)$.</p>` },
    { h: 'Sistemas $Ax=b$ y $Ax=0$', src: [33], html: R`
      <p>Solución general de $Ax=b$ = <b>una solución particular</b> + <b>solución general de $Ax=0$</b>.</p>
      <p>Ej. de clase: $x+2y=1,\ 2x+4y+z=3$ da $\col{x,y,z}=\col{1,0,1}+t\col{-2,1,0}$; el homogéneo da $t\col{-2,1,0}$ (la misma recta pasando por el origen).</p>` },
    { h: 'Rango, nulidad y el teorema', src: [38], html: R`
      <p>$\operatorname{rango}(A)=\dim\operatorname{row}(A)=\dim\operatorname{col}(A)$ = número de pivotes. $\ \nu(A)=\dim N(A)$ = número de variables libres.</p>
      $$\boxed{\operatorname{rango}(A)+\nu(A)=n\quad(n=\text{número de columnas})}$$
      <p>Si $Ax=b$ es consistente con $n$ incógnitas y rango $r$, la solución general tiene $n-r$ parámetros.</p>` },
    { h: R`Truco $[A\,|\,I]\sim[R\,|\,E]$`, src: [39, 40], html: R`
      <p>Escalonando $[A|I]$ hasta $[R|E]$ ($A$ de $m\times n$, rango $r$):</p>
      <ol><li>Base de $\operatorname{row}(A)$: las $r$ filas pivote de $R$.</li>
      <li>Base de $\operatorname{col}(A)$: las $r$ columnas de $A$ en posición pivote.</li>
      <li>Base de $N(A^\top)$: las últimas $m-r$ filas de $E$.</li></ol>` },
  ]
},
{
  id: 's09', wk: 'Semana 9', title: 'Transformaciones lineales y matriz estándar',
  intro: 'Ítem 1 del examen final: decidir si algo es lineal (aditividad y homogeneidad) y encontrar su matriz.',
  blocks: [
    { h: R`Transformación de $\mathbb{R}^n$ a $\mathbb{R}^m$`, src: [8, 10, 13], html: R`
      <p>$T:\mathbb{R}^n\to\mathbb{R}^m$ es una función que a cada $x\in\mathbb{R}^n$ le asigna $T(x)\in\mathbb{R}^m$. Si $m=n$ se llama <b>operador</b>.</p>
      <p>Una <b>transformación matricial</b> es $T_A(x)=Ax$ con $A$ de $m\times n$ (cada componente de la salida es una combinación lineal de las entradas, sin constantes ni potencias).</p>` },
    { h: 'Propiedades: aditividad y homogeneidad', src: [18], html: R`
      <p>$T$ es transformación lineal (matricial) si y solo si, para todo $u,v$ y todo escalar $k$:</p>
      $$T(u+v)=T(u)+T(v)\ \ \text{(aditividad)}\qquad T(ku)=kT(u)\ \ \text{(homogeneidad)}$$
      <div class="box warn"><b>Consecuencia útil:</b> $T(0)=T(0\cdot u)=0\cdot T(u)=0$. Si $T(0)\neq0$, <b>no</b> es lineal (atajo rápido). Pero $T(0)=0$ <b>no basta</b>: $T(x,y)=(x^2+y,\,x-y^2)$ cumple $T(0)=0$ y no es lineal. <span class="pill warn">del banco de entrenamiento</span></div>
      <p>Para probar que <b>no</b> es lineal basta un contraejemplo numérico concreto. Para probar que <b>sí</b> lo es, hay que hacerlo con $u,v,k$ genéricos (o mostrar que $T(x)=Ax$).</p>` },
    { h: 'Matriz estándar (asociada)', src: [21, 22, 26], html: R`
      <p>Una TL queda determinada por las imágenes de la base canónica:</p>
      $$A=\big[\,T(e_1)\,|\,T(e_2)\,|\,\cdots\,|\,T(e_n)\,\big]\qquad\Rightarrow\qquad T(x)=Ax$$
      <p>Las imágenes van como <b>columnas</b> (no filas).</p>
      <div class="box">Ej. de clase: si $T(e_1)=(2,-1,4)$, $T(e_2)=(1,5,-2)$, $T(e_3)=(0,3,1)$, entonces $T(2,3,-2)=2T(e_1)+3T(e_2)-2T(e_3)=(7,7,0)$.</div>
      <p>Si te dan imágenes de vectores <b>no canónicos</b>, primero escribe $e_1,e_2,\dots$ como combinación de esos vectores y usa linealidad.</p>` },
  ]
},
{
  id: 's10', wk: 'Semana 10', title: 'Transformaciones comunes, núcleo e imagen',
  intro: 'Reflexiones, escalamientos, proyecciones y rotaciones tienen matrices fijas que conviene memorizar. Núcleo = espacio nulo de A; imagen = espacio columna de A.',
  blocks: [
    { h: 'Tabla de transformaciones comunes', src: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], html: R`
      <div class="tablewrap"><table>
      <tr><th>Transformación</th><th>Fórmula</th><th>Matriz</th></tr>
      <tr><td>Reflexión sobre eje $X$</td><td>$(x,-y)$</td><td>$\mat{1,0;0,-1}$</td></tr>
      <tr><td>Reflexión sobre eje $Y$</td><td>$(-x,y)$</td><td>$\mat{-1,0;0,1}$</td></tr>
      <tr><td>Reflexión sobre $y=x$</td><td>$(y,x)$</td><td>$\mat{0,1;1,0}$</td></tr>
      <tr><td>Reflexión sobre plano $XY$ / $XZ$ / $YZ$</td><td>cambia signo de $z$ / $y$ / $x$</td><td>$\operatorname{diag}(1,1,-1)$, $\operatorname{diag}(1,-1,1)$, $\operatorname{diag}(-1,1,1)$</td></tr>
      <tr><td>Escalamiento $\mathbb{R}^2$ / $\mathbb{R}^3$</td><td>$(ax,by)$ / $(ax,by,cz)$</td><td>$\operatorname{diag}(a,b)$ / $\operatorname{diag}(a,b,c)$</td></tr>
      <tr><td>Proyección sobre plano $XY$ / $XZ$ / $YZ$</td><td>anula $z$ / $y$ / $x$</td><td>$\operatorname{diag}(1,1,0)$, $\operatorname{diag}(1,0,1)$, $\operatorname{diag}(0,1,1)$</td></tr>
      </table></div>
      <p>Escalamiento: $a,b&gt;1$ dilata, $0&lt;a,b&lt;1$ contrae, negativos además reflejan.</p>` },
    { h: 'Rotaciones', src: [17, 18, 19, 20], html: R`
      $$R_\theta=\mat{\cos\theta,-\sin\theta;\sin\theta,\cos\theta}\quad(\text{antihorario, mantiene longitudes, } R^\top=R^{-1})$$
      $$R_x=\mat{1,0,0;0,\cos\theta,-\sin\theta;0,\sin\theta,\cos\theta}\quad R_y=\mat{\cos\theta,0,\sin\theta;0,1,0;-\sin\theta,0,\cos\theta}\quad R_z=\mat{\cos\theta,-\sin\theta,0;\sin\theta,\cos\theta,0;0,0,1}$$
      <p>En cada una, la coordenada del eje de giro queda fija. <b>Composición:</b> aplicar $T_1$ y luego $T_2$ tiene matriz $A_2A_1$ (la última a la izquierda).</p>` },
    { h: 'Núcleo e imagen', src: [22, 23, 24], html: R`
      <p>$\ker(T)=\{v: T(v)=0\}$ &nbsp;y&nbsp; $\operatorname{Im}(T)=\{T(v)\}$. Con $T(x)=Ax$:</p>
      <ul><li><b>Núcleo</b>: resolver $Ax=0$ → $\ker(T)=N(A)$. $\ \ker(T)=\{0\}\iff Ax=0$ tiene solución única ($T$ inyectiva).</li>
      <li><b>Imagen</b>: combinaciones de las columnas → $\operatorname{Im}(T)=\operatorname{col}(A)$. $\ b\in\operatorname{Im}(T)\iff Ax=b$ tiene solución.</li></ul>
      <div class="box ok">Por rango-nulidad (S07): $\ \dim\ker(T)+\dim\operatorname{Im}(T)=n$ (dimensión del dominio).</div>` },
    { h: 'Ejemplos de clase', src: [25, 26, 27], html: R`
      <p>$T(x,y,z)=(x+2y,\ y-z)$, $A=\mat{1,2,0;0,1,-1}$. Núcleo: $y=z,\ x=-2z$ → $\ker T=\operatorname{Gen}\{(-2,1,1)\}$. Imagen: el sistema $x+2y=b_1,\ y-z=b_2$ siempre tiene solución → $\operatorname{Im}T=\mathbb{R}^2$. Verifica: $1+2=3$ ✓.</p>
      <p>$T(x,y)=(x+2y,0,2x+4y)$: $\ker T=\{(-2y,y)\}=\operatorname{Gen}\{(-2,1)\}$.</p>` },
  ]
},
{
  id: 's11', wk: 'Semana 11', title: 'Valores y vectores propios',
  intro: 'El cálculo base para diagonalizar, para sistemas dinámicos y para la SVD. Siempre: polinomio característico → raíces → resolver (A − λI)v = 0.',
  blocks: [
    { h: 'Definición y procedimiento', src: [12, 19, 21], html: R`
      <p>$x\neq0$ es <b>vector propio</b> de $A$ si $Ax=\lambda x$; $\lambda$ es su <b>valor propio</b>. El conjunto de valores propios es el espectro $\sigma(A)$.</p>
      <ol><li>Polinomio característico $p_A(\lambda)=\det(A-\lambda I)$ (grado $n$). Raíces = valores propios.</li>
      <li>Para cada $\lambda$, resuelve $(A-\lambda I)v=0$. Una base de $N(A-\lambda I)$ es una base del <b>espacio propio</b> $E_\lambda$.</li></ol>
      <div class="box">Ej. de clase: $A=\mat{4,2;3,3}$, $p(\lambda)=\lambda^2-7\lambda+6=(\lambda-1)(\lambda-6)$. $E_1=\operatorname{Gen}\{(2,-3)\}$, $E_6=\operatorname{Gen}\{(1,1)\}$.</div>
      <div class="box warn"><b>Atajo:</b> si $A$ es triangular, sus valores propios son los de la diagonal.</div>` },
    { h: 'Errata en la diapositiva', src: [24], html: R`
      <div class="box bad">En S11 pág. 24 ($A=\mat{1,-1,4;3,2,-1;2,1,-1}$) se escribe $-(\lambda-1)(\lambda-2)(\lambda-3)$, pero lo correcto es $-(\lambda-1)(\lambda+2)(\lambda-3)$: los valores propios son $1,\,-2,\,3$ (como dice la misma diapositiva). $E_3=\operatorname{Gen}\{(1,2,1)\}$ ✓.</div>` },
    { h: 'Multiplicidad algebraica y geométrica', src: [27, 29, 30], html: R`
      <ul><li>$m.a(\lambda)$ = exponente de $(\lambda-\lambda_i)$ en $p_A$.</li>
      <li>$m.g(\lambda)=\dim E_\lambda=\dim N(A-\lambda I)$.</li></ul>
      $$m.g(\lambda)=n-\operatorname{rango}(A-\lambda I)\qquad\qquad 1\le m.g(\lambda)\le m.a(\lambda)$$
      <div class="box">Ej. de clase: $A=\mat{-5,-5,-9;8,9,18;-2,-3,-7}$, $p(\lambda)=-(\lambda+1)^3$: $m.a(-1)=3$ pero $E_{-1}=\operatorname{Gen}\{(3,-6,2)\}$, $m.g(-1)=1$.</div>` },
    { h: 'Propiedades (traza, determinante, potencias)', src: [40, 41, 42], html: R`
      <ul>
      <li>$\lambda_1+\dots+\lambda_n=\operatorname{tr}(A)$ (suma de la diagonal).</li>
      <li>$\lambda_1\cdots\lambda_n=\det(A)$. En particular, $0$ es valor propio $\iff A$ no invertible.</li>
      <li>$A^kx=\lambda^kx$: los valores propios de $A^k$ son $\lambda^k$ (mismos vectores propios).</li>
      <li>$A^{-1}x=\tfrac1\lambda x$ si $\lambda\neq0$.</li>
      <li>Simétrica ($A=A^\top$) → valores propios reales y vectores propios de valores distintos ortogonales.</li>
      <li>Valores propios distintos → vectores propios LI.</li></ul>
      <div class="box">Ej.: $A=\mat{2,1;1,2}$: $\lambda=3,1$; $3+1=4=\operatorname{tr}A$ y $3\cdot1=3=\det A$; $(1,1)\cdot(1,-1)=0$.</div>` },
  ]
},
{
  id: 's12', wk: 'Semana 12', title: 'Diagonalización y sistemas dinámicos discretos',
  intro: 'Ítem 5 del examen: un sistema x_{k+1} = M x_k (migración entre dos estados) que se resuelve diagonalizando y tomando el límite.',
  blocks: [
    { h: 'Semejanza y diagonalización', src: [9, 11], html: R`
      <p>$B$ es <b>semejante</b> a $A$ si $B=P^{-1}AP$ con $P$ invertible. $A$ es <b>diagonalizable</b> si es semejante a una diagonal:</p>
      $$P^{-1}AP=D\qquad\Longleftrightarrow\qquad A=PDP^{-1}$$` },
    { h: 'Criterios', src: [13, 15], html: R`
      <ul><li><b>(I)</b> $A$ ($n\times n$) es diagonalizable $\iff$ tiene $n$ vectores propios LI. Entonces $P=[v_1|\dots|v_n]$ y $D=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$ <b>en el mismo orden</b>.</li>
      <li><b>(II)</b> $A$ es diagonalizable $\iff m.g(\lambda_i)=m.a(\lambda_i)$ para todo $\lambda_i$.</li></ul>
      <div class="box ok">Si los $n$ valores propios son distintos → siempre diagonalizable (cada uno aporta un vector y son LI).</div>` },
    { h: 'Procedimiento para diagonalizar', src: [18, 20, 21, 22], html: R`
      <ol><li>Raíces de $p(\lambda)=\det(A-\lambda I)$ y su $m.a$.</li>
      <li>Para cada $\lambda_i$, base de $E_{\lambda_i}$ resolviendo $(A-\lambda_iI)v=0$. Si $m.g\neq m.a$ en algún caso → no diagonalizable.</li>
      <li>$P$ = vectores propios en columnas; $D$ = valores propios en el mismo orden.</li></ol>
      <div class="box">Ej. de clase: $A=\mat{0,0,-2;1,2,1;1,0,3}$, $p=(\lambda-1)(\lambda-2)^2$. $E_2=\operatorname{Gen}\{(-1,0,1),(0,1,0)\}$, $E_1=\operatorname{Gen}\{(-2,1,1)\}$ → $P=\mat{-1,0,-2;0,1,1;1,0,1}$, $D=\operatorname{diag}(2,2,1)$.</div>` },
    { h: 'Sistemas dinámicos discretos', src: [26], html: R`
      $$x_{k+1}=Ax_k\ \Rightarrow\ x_k=A^kx_0=PD^kP^{-1}x_0,\qquad D^k=\operatorname{diag}(\lambda_1^k,\dots,\lambda_n^k)$$
      <p>Forma más cómoda (2×2): escribe $x_0=c_1v_1+c_2v_2$ con los vectores propios. Entonces</p>
      $$x_k=c_1\lambda_1^k v_1+c_2\lambda_2^k v_2.$$
      <p>Si $\lambda_1=1$ y $|\lambda_2|&lt;1$: $\lambda_2^k\to0$ y $x_k\to c_1v_1$ (estado estacionario).</p>
      <div class="box warn"><b>Atajo para matrices de transición</b> (cada columna suma 1): $\lambda_1=1$ siempre, y en $2\times2$, $\lambda_2=\operatorname{tr}(M)-1$. El total de población se conserva, así que el límite es $c_1v_1$ con $c_1=\frac{\text{total}}{\text{suma de componentes de }v_1}$. <span class="pill warn">del banco de entrenamiento</span></div>` },
    { h: 'Ejemplo de clase: ciudad y zona rural', src: [28, 30, 32, 33], html: R`
      <p>80% de la ciudad se queda y 20% migra al campo; 30% del campo va a la ciudad y 70% se queda:</p>
      $$x_k=\col{c_k,r_k},\qquad A=\mat{0.8,0.3;0.2,0.7}$$
      <p><b>Columna $j$ = de dónde sale la gente</b> (columna 1: ciudad → 0.8 se queda en ciudad, 0.2 va a campo).</p>
      <p>$\lambda_1=1$, $E_1=\operatorname{Gen}\{(3,2)\}$; $\lambda_2=0.5$, $E_{0.5}=\operatorname{Gen}\{(1,-1)\}$. Con $x_0=(5,5)=2(3,2)-(1,-1)$:</p>
      $$x_k=2\col{3,2}-(0.5)^k\col{1,-1}\ \xrightarrow{k\to\infty}\ \col{6,4}$$
      <p>A largo plazo: 6 mil en la ciudad y 4 mil en el campo (proporción 3:2, 60%–40%).</p>` },
  ]
},
{
  id: 's13', wk: 'Semana 13', title: 'Producto interno, Gram-Schmidt y diagonalización ortogonal',
  intro: 'Ítems 2 y 3 del examen: ortogonalidad/Pitágoras y Gram-Schmidt. También la diagonalización ortogonal de matrices simétricas, que es la base de la SVD.',
  blocks: [
    { h: 'Producto interno y norma', src: [9, 10, 11, 13], html: R`
      <p>Un producto interno cumple: simetría $\langle u,v\rangle=\langle v,u\rangle$, aditividad, homogeneidad $\langle ku,v\rangle=k\langle u,v\rangle$ y positividad $\langle v,v\rangle\ge0$ (=0 solo si $v=0$).</p>
      <p>En $\mathbb{R}^n$: $\langle u,v\rangle=u^\top v=u_1v_1+\dots+u_nv_n$. &nbsp; Norma: $\|v\|=\sqrt{\langle v,v\rangle}$. &nbsp; Normalizar: $\hat v=v/\|v\|$ (mismo sentido, norma 1).</p>
      <div class="box">Ej.: $u=(1,-2,3)$: $\|u\|=\sqrt{14}$, $\hat u=\tfrac{1}{\sqrt{14}}(1,-2,3)$.</div>` },
    { h: 'Ortogonalidad y Pitágoras', src: [15, 17, 20, 23], html: R`
      <p>$u\perp v\iff\langle u,v\rangle=0$. Un conjunto <b>ortogonal</b> de vectores no nulos es LI; si además todos tienen norma 1 es <b>ortonormal</b>.</p>
      <div class="box warn"><b>Ítem 2 del examen (Pitágoras)</b> <span class="pill warn">del banco de entrenamiento</span><br>
      Desarrollando con las propiedades del producto interno:
      $$\|u+v\|^2=\langle u+v,u+v\rangle=\|u\|^2+2\langle u,v\rangle+\|v\|^2$$
      Por lo tanto $\ \|u+v\|^2=\|u\|^2+\|v\|^2\iff\langle u,v\rangle=0\iff u\perp v$. Lo mismo con $\|u-v\|^2=\|u\|^2-2\langle u,v\rangle+\|v\|^2$.</div>` },
    { h: 'Proyección ortogonal', src: [24, 27], html: R`
      $$\operatorname{proy}_v u=\frac{\langle u,v\rangle}{\|v\|^2}\,v\qquad\text{y}\qquad u-\operatorname{proy}_v u\ \perp\ v$$
      <div class="box">Ej. de clase: $u=(3,4)$, $a=(2,1)$: $\operatorname{proy}_a u=\tfrac{10}{5}(2,1)=(4,2)$ y $u-\operatorname{proy}=(-1,2)\perp a$.</div>` },
    { h: 'Proceso de Gram-Schmidt', src: [29, 30, 31, 34], html: R`
      <p>Convierte una base $\{u_1,\dots,u_r\}$ en una base ortogonal $\{v_1,\dots,v_r\}$ del mismo subespacio restando proyecciones:</p>
      $$v_1=u_1,\quad v_2=u_2-\frac{\langle u_2,v_1\rangle}{\|v_1\|^2}v_1,\quad v_3=u_3-\frac{\langle u_3,v_1\rangle}{\|v_1\|^2}v_1-\frac{\langle u_3,v_2\rangle}{\|v_2\|^2}v_2$$
      <p>Para ortonormal: $q_i=v_i/\|v_i\|$ (o normalizar en cada paso y usar $v_k=u_k-\sum\langle u_k,q_j\rangle q_j$).</p>
      <div class="box ok"><b>Truco de cuentas:</b> puedes multiplicar cada $v_i$ por un escalar (quitar fracciones) antes de seguir; la dirección no cambia. Verifica siempre $\langle v_i,v_j\rangle=0$ al final.</div>` },
    { h: 'Diagonalización ortogonal', src: [36, 37, 38, 39, 42, 43, 45], html: R`
      <p>$A$ es diagonalizable ortogonalmente si $A=PDP^\top$ con $P$ ortogonal ($P^{-1}=P^\top$).</p>
      <div class="box"><b>Teorema:</b> $A$ es diagonalizable ortogonalmente $\iff$ tiene $n$ vectores propios ortonormales $\iff$ <b>$A$ es simétrica</b>. Además, si $A$ es simétrica: valores propios reales y vectores propios de valores distintos ortogonales.</div>
      <ol><li>Valores propios con $\det(A-\lambda I)=0$.</li>
      <li>Base de cada $E_\lambda$; si un espacio propio tiene dimensión $\ge2$, aplica Gram-Schmidt <b>dentro</b> de él; luego normaliza todo.</li>
      <li>$P$ = vectores ortonormales en columnas, $D=P^\top AP$.</li></ol>
      <p>Ej. de clase: $A=\mat{4,2,2;2,4,2;2,2,4}$, $p=(\lambda-2)^2(\lambda-8)$, $P=\mat{-1/\sqrt2,-1/\sqrt6,1/\sqrt3;1/\sqrt2,-1/\sqrt6,1/\sqrt3;0,2/\sqrt6,1/\sqrt3}$, $D=\operatorname{diag}(2,2,8)$.</p>` },
  ]
},
{
  id: 's14', wk: 'Semana 14', title: 'Factorización QR y descomposición en valores singulares (SVD)',
  intro: 'Ítems 3 y 4 del examen: QR sale directo de Gram-Schmidt; la SVD sale de diagonalizar ortogonalmente AᵀA.',
  blocks: [
    { h: 'Matriz ortogonal', src: [9], html: R`
      <p>$Q$ ($m\times n$) es ortogonal (columnas ortonormales) si $Q^\top Q=I$. Si es cuadrada: $Q^\top Q=QQ^\top=I$, o sea $Q^{-1}=Q^\top$.</p>
      <div class="box bad"><b>Errata:</b> el ejemplo cuadrado de la diapositiva, $\tfrac{1}{\sqrt{13}}\mat{3,-2;2,-3}$, <b>no</b> es ortogonal (sus columnas tienen producto $-12$). La correcta es $\tfrac{1}{\sqrt{13}}\mat{3,-2;2,3}$, que es la $Q$ del ejemplo QR de la misma clase.</div>` },
    { h: 'Factorización QR', src: [8, 10], html: R`
      <p>Si las columnas $u_1,\dots,u_n$ de $A$ son LI, Gram-Schmidt da $q_1,\dots,q_n$ ortonormales y</p>
      $$A=QR,\qquad Q=[q_1|\cdots|q_n],\qquad R=\mat{u_1\cdot q_1,u_2\cdot q_1,\cdots,u_n\cdot q_1;0,u_2\cdot q_2,\cdots,u_n\cdot q_2;\vdots,\vdots,\ddots,\vdots;0,0,\cdots,u_n\cdot q_n}$$
      <p>$Q$ tiene el mismo tamaño que $A$, $R$ es triangular superior $n\times n$ con diagonal positiva: $R_{ii}=\|v_i\|$. Como $Q^\top Q=I$, también $R=Q^\top A$.</p>` },
    { h: 'Ejemplos de clase', src: [14, 17], html: R`
      <p>$A=\mat{3,1;2,3}$: $q_1=\tfrac{1}{\sqrt{13}}(3,2)$, $v_2=\tfrac1{13}(-14,21)$, $q_2=\tfrac1{\sqrt{13}}(-2,3)$; $Q=\tfrac1{\sqrt{13}}\mat{3,-2;2,3}$, $R=\tfrac1{\sqrt{13}}\mat{13,9;0,7}$.</p>
      <div class="box bad"><b>Errata:</b> en la pág. 12 aparece $\tfrac1{13}(27,28)$; lo correcto es $\operatorname{proy}=\tfrac{9}{13}(3,2)=\tfrac1{13}(27,18)$ (así sale en la pág. 13).</div>
      <p>$A=\mat{1,1;1,0;0,1}$: $Q=\mat{1/\sqrt2,1/\sqrt6;1/\sqrt2,-1/\sqrt6;0,2/\sqrt6}$, $R=\mat{2/\sqrt2,1/\sqrt2;0,3/\sqrt6}=\mat{\sqrt2,1/\sqrt2;0,\sqrt{6}/2}$.</p>` },
    { h: 'Valores singulares', src: [21, 24], html: R`
      <p>Para cualquier $A$ ($m\times n$): $A^\top A$ es simétrica, ortogonalmente diagonalizable y sus valores propios son $\ge0$.</p>
      $$\sigma_i=\sqrt{\lambda_i(A^\top A)},\qquad \sigma_1\ge\sigma_2\ge\dots\ge0$$
      <p>Ej. de clase: $A=\mat{1,1;0,1;1,0}$, $A^\top A=\mat{2,1;1,2}$, $\lambda=3,1$ → $\sigma_1=\sqrt3$, $\sigma_2=1$.</p>` },
    { h: R`SVD: $A=U\Sigma V^\top$`, src: [25, 26], html: R`
      <p>$U$ ($m\times m$) y $V$ ($n\times n$) ortogonales, $\Sigma$ ($m\times n$) con $\sigma_1,\dots,\sigma_k$ en la diagonal ($k$ = rango) y ceros en el resto.</p>
      <ol type="a"><li>$V=[v_1|\dots|v_n]$ diagonaliza ortogonalmente $A^\top A$ (vectores propios ortonormales).</li>
      <li>$\sigma_i=\sqrt{\lambda_i}$, ordenados de mayor a menor (y $V$ en ese mismo orden).</li>
      <li>$u_i=\dfrac{Av_i}{\sigma_i}$ para $i=1,\dots,k$.</li>
      <li>$\{u_1,\dots,u_k\}$ es base ortonormal de $\operatorname{col}(A)$; se completa a base ortonormal de $\mathbb{R}^m$ (resolviendo el sistema "ortogonal a los $u_i$" y aplicando Gram-Schmidt si hace falta).</li></ol>
      <div class="box warn"><b>Ojo con la receta de la pág. 34</b> (calcular $U$ con los vectores propios de $AA^\top$ por separado): sirve, pero los signos de $u_i$ pueden no cuadrar con los de $v_i$ y entonces $U\Sigma V^\top\neq A$. Lo seguro es <b>$u_i=Av_i/\sigma_i$</b>.</div>` },
    { h: 'Ejemplo completo de clase', src: [32], html: R`
      $$\mat{1,1;0,1;1,0}=\mat{\sqrt6/3,0,-1/\sqrt3;\sqrt6/6,-\sqrt2/2,1/\sqrt3;\sqrt6/6,\sqrt2/2,1/\sqrt3}\mat{\sqrt3,0;0,1;0,0}\mat{\sqrt2/2,\sqrt2/2;\sqrt2/2,-\sqrt2/2}$$
      <p>$u_3$ sale de resolver $\mat{2,1,1;0,-1,1}x=0$ (ortogonal a $u_1,u_2$) → $u_3=\tfrac1{\sqrt3}(-1,1,1)$.</p>` },
    { h: 'SVD reducida y aproximación de rango bajo', src: [36, 37, 38, 39, 41], html: R`
      <p>Quedándote solo con la parte no nula: $A=U_1\Sigma_1V_1^\top$ con $U_1$ ($m\times k$), $\Sigma_1$ ($k\times k$), $V_1^\top$ ($k\times n$). Equivalentemente:</p>
      $$A=\sigma_1u_1v_1^\top+\sigma_2u_2v_2^\top+\dots+\sigma_ku_kv_k^\top\ \approx\ \sigma_1u_1v_1^\top+\dots+\sigma_pu_pv_p^\top=A_{aprox}\ \ (p&lt;k)$$
      <p>Se descartan los términos con $\sigma$ pequeños. En el ejemplo de clase ($8\times4$, $\sigma=36.85,\ 26.28,\ 0.02,\ 0.01$) con $p=2$ el error es de milésimas. En imágenes: rango 5 se ve borroso, rango 50–100 ya se ve casi igual.</p>
      <div class="box warn">Error de la mejor aproximación de rango $p$ (norma de Frobenius): $\sqrt{\sigma_{p+1}^2+\dots+\sigma_k^2}$. <span class="pill warn">del banco maratón, no está en las diapositivas</span></div>` },
    { h: 'Ejemplo de rango 1 (con erratas corregidas)', src: [42, 43, 44], html: R`
      <p>$A=\mat{-3,1;6,-2;6,-2}$, $A^\top A=\mat{81,-27;-27,9}$.</p>
      <div class="box bad"><b>Erratas de la diapositiva:</b> (1) los valores propios de $A^\top A$ son $\lambda=90$ y $0$ (no 9; la traza es 90), así que $\sigma_1=\sqrt{90}=3\sqrt{10}$ como sale en el resultado final. (2) En $AA^\top$ la tercera fila es $(-20,40,40)$, no $(-40,\dots)$. (3) Los vectores $\tfrac1{\sqrt5}(2,1,0)$ y $\tfrac1{\sqrt5}(2,0,1)$ generan el espacio correcto pero <b>no son ortogonales</b> entre sí (producto 4): hay que aplicarles Gram-Schmidt para que $U$ sea ortogonal. Ver el ejercicio resuelto.</div>` },
  ]
},
];

const EXAM_MAP = [
  { item: 'Ítem 1', tema: 'Linealidad: aditividad, homogeneidad, $T(0)=0$', logro: 'AL.4.1.2', sec: 's09' },
  { item: 'Ítem 2', tema: 'Ortogonalidad, norma y teorema de Pitágoras', logro: 'AL.6.1.1', sec: 's13' },
  { item: 'Ítem 3', tema: 'Gram-Schmidt (a) y factorización QR (b, c)', logro: 'AL.6.1.2 · AL.6.1.4', sec: 's14' },
  { item: 'Ítem 4', tema: 'SVD: $V$, $\\Sigma$ y $U$ con sus órdenes', logro: 'AL.6.1.5', sec: 's14' },
  { item: 'Ítem 5', tema: 'Sistemas dinámicos discretos y diagonalización', logro: 'AL.5.1.4 · AL.5.1.5', sec: 's12' },
];
