import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./routes/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";
import { darkTheme, lightTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: "Rubik", sans-serif;
  font-weight: 300;
  background: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
a {
  text-decoration: none;
  color: inherit;
}
`;

const ThemeBtn = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  left: 15px;
  bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.floatBgColor};
  border-radius: 50px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  font-size: 20px;
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

function App() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((prevMode) => !prevMode);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle></GlobalStyle>
        <Router></Router>
        <ReactQueryDevtools initialIsOpen={true} />
        <ThemeBtn onClick={toggleDarkAtom}>
          {isDark ? (
            <FontAwesomeIcon icon={["fas", "sun"]} size="lg" />
          ) : (
            <FontAwesomeIcon icon={["fas", "moon"]} size="lg" />
          )}
        </ThemeBtn>
      </ThemeProvider>
    </>
  );
}

export default App;
