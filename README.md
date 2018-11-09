# rastreando-o-busao
Aplicação de testes de geoposicionamento, que usa o serviço  REST para localizar visualizar os veiculos ativos em determinada linha de onibus. Ela utiliza os dados abertos de transporte público do Rio de Janeiro / Brasil.

A documentação do serviço está disponível em:
http://dadosabertos.rio.rj.gov.br/apitransporte/apresentacao/pdf/documentacao_gps.pdf


<h2>Screens</h2>
<table>
  <tr>
    <td><img src="https://github.com/nosphera/rastreando-o-busao/blob/master/screenshots/screenshot1.jpeg" /></td>
    <td><img src="https://github.com/nosphera/rastreando-o-busao/blob/master/screenshots/screenshot2.jpeg" /></td>
    <td><img src="https://github.com/nosphera/rastreando-o-busao/blob/master/screenshots/screenshot3.jpeg" /></td>
  </tr>
</table>



<h2>Pre-requisitos para rodar:</h2> 


<h3> Node / NPM</h3>
<p>Instale o NodeJs em sua máquina, após execute o comando (em um terminal ou prompt de comando) "npm i -g npm" para atualizar o gerenciador de pacotes npm;</p>


<h3> react-native-cli</h3>
<p>Instale a interface de linha de comando do react-native: "npm i -g react-native-cli"</p>


<h3>Android SDK 26 (para rodar no android):</h3>
<p> Certifique-se que você possui o SDK do android instalado, com o build tools acima da versão 26. O Emulador do Android é instalado juntamente, mas precisa ser ativado através do "Androi Virtual Device Mannager" (AVD Mannager). Você pode utilizar outro emulador, como o Genymotion se preferir.</p>


<h3>Baixe os Fontes</h3>
<p>Baixe os fontes ou clone o repositório em um local conhecido, com permissão de escrita e que você tenha acesso a ele</p>


<h3> NPM Install</h3>
<p>Abra um terminal (terminal, powershell, prompt de comando, atraves do VS Code ....) e navegue até o diretório onde voce efetuou o download dos fontes. Após isso execute o comando "npm install" e aguarde a finalização do processo.</p>


<h3> Conecte o celular ou Inicie o emulador</h3>
<p>Abra o emulador de sua preferência e aguarde o processo de inicialização. Certifique-se que o seu computador detectou o aparelho e que este está com a depuração USB, e a permissão para instalar aplicativos de fonte externa ativadas. No android, para verificar se o aparelho ou emulador foi detectado digite no terminal "adb devices", e serão listados na tela os dispositivos conectados (tanto emulador como físicos) - NÃO CONECTE MAIS DE UM DEVICE AO MESMO TEMPO</p>


<h3>Execute a aplicação</h3>
<p> No Terminal aberto, navegue até o diretório onde estão os fontes e execute "react-native run-android".</p>


<h4>apk Assinado para download e testes em ANDROID: 
<a href="https://drive.google.com/open?id=1-yKbtaKsQ9ZAI2LYE76Xbj6WOXGO_AgP">rjbus.apk</a></h4>
