# rastreando-o-busao
Aplicação de testes de geoposicionamento, que usa o serviço  REST para localizar e atualizar o cadastros de linhas de onibus. Ela consome os dados abertos do transporte público do Rio de Janeiro / Brasil.

A documentação do serviço está disponível em:
http://dadosabertos.rio.rj.gov.br/apitransporte/apresentacao/pdf/documentacao_gps.pdf

<h1>Screens</h1>
<table>
  <tr>
    <td><img src="https://github.com/nosphera/rastreando-o-busao/blob/master/screenshots/screenshot1.jpeg" /></td>
    <td><img src="https://github.com/nosphera/rastreando-o-busao/blob/master/screenshots/screenshot2.jpeg" /></td>
    <td><img src="https://github.com/nosphera/rastreando-o-busao/blob/master/screenshots/screenshot3.jpeg" /></td>
  </tr>
</table>





<h1>Pre-requisitos para rodar:</h1> 

<h2> Node / NPM</h2>
<p>Instale o NodeJs em sua máquina, após execute o comando (em um terminal ou prompt de comando) "npm i -g npm" para atualizar o gerenciador de pacotes npm;</p>

<h2> react-native-cli</h2>
<p>Instale a interface de linha de comando do react-native: "npm i -g react-native-cli"</p>

<h2>Android SDK 26 (para rodar no android):</h2>
<p> Certifique- que você possui o SDK do android instalado co o build tools acima da versão 26, o Emulador do Android é instalado juntamente. Você pode utilizar outro emulador, como o Genymotion.</p>

<h2>XCode (para rodar no Mac / IOS)</h2>
<p>Certifique-se que você possui o xcode instalado, o emulador do IOS é habilitado juntamente com ele</p>

<h2>Baixe os Fontes</h2>
<p>Baixe os fontes ou clone o repositório em um local conhecido, com permissão de escrita e que você tenha acesso a ele</p>

<h2> NPM Install</h2>
<p>Abra um terminal (terminal, powershell, prompt de comando, atraves do VS Code ....) e navegue até o diretório onde voce efetuou o download dos fontes. Após isso execute o comando "npm install" e aguarde a finalização do processo.</p>

<h2> Conecte o celular ou Inicie o emulador</h2>
<p>Abra o emulador de sua preferência e aguarde o processo de inicialização. Certifique-se que o seu computador detectou o aparelho e que este está com a depuração USB, e a permissão para instalar aplicativos de fonte externa ativadas. No android, para verificar se o aparelho ou emulador foi detectado digite no terminal "adb devices", e serão listados na tela os dispositivos conectados (tanto emulador como físicos) - NÃO CONECTE MAIS DE UM DEVICE AO MESMO TEMPO</p>

<h2>Execute a aplicação</h2>
<p> No Terminal aberto, navegue até o diretório onde estão os fontes e execute "react-native run-android" ou "react-native run-ios" de acordo com a plataforma que você escolheu.</p>


apk Assinado para download e testes em ANDROID: 
<a href="https://drive.google.com/open?id=1-yKbtaKsQ9ZAI2LYE76Xbj6WOXGO_AgP">LinhasOnibus.apk</a>
