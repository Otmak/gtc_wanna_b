# What is gtc_wanna_b ?

gtc_wanna_b is v3 of the Zpeek application. Click the links to checkout [v1](https://github.com/Otmak/zonar_peek) and [v2](https://github.com/Otmak/zpeek):

### `What's new 👀?`

gtc_wanna_b (gtc wanna be)'s UI and is somewhat the same as Zpeek [version 2](https://github.com/Otmak/zpeek) .\
The focus here is the overall design of Zpeek, and a better expression of the Zpeek idea after gaining a OK Python, JavaScript and JavaScrtipt runtime understanding.\
In other words gtc wanna b is an attempt at Clean, Efficient and Scalable code then create a CI/CD Pipeline on the **Google Cloud Platform** using [Cloud Build](https://cloud.google.com/build) to build and push the docker images to [Artifact Registry](https://cloud.google.com/artifact-registry), then Finally deploy and run the containers on [GKE](https://cloud.google.com/kubernetes-engine).  \
A quick overview of what gtc_wanna_b looks like below, the idea is to display all "essential" vehicle data on a dashboard.

The after you suceesfully launch, gtc_wanna_b will request for a 'code' and OMI password.\
![Login page](https://github.com/Otmak/gtc_wanna_b/blob/b6951b7eccdcb8d4b1f71c1545aa07a65844da74/react-frontend/public/loading.png)
\
Then after a succefull Login the dashboard will display the available data.\
![dashboard](https://github.com/Otmak/gtc_wanna_b/blob/b6951b7eccdcb8d4b1f71c1545aa07a65844da74/react-frontend/public/dash.png)
\
When Zpeek is requesting for data you get a Loading skeleton on each card until the results are ready.\
![Loading data](https://github.com/Otmak/gtc_wanna_b/blob/b6951b7eccdcb8d4b1f71c1545aa07a65844da74/react-frontend/public/loading.png)
