1. sign up to have a new atlas account
2. Create a new cluster
3. configure username and password
4. save mysql tables as csv files inside '/c/ProgramData/MySQL/MySQL Server 8.0/Uploads' in local using the command in week3 readme dpcumentation
5. download compass GUI
6. Go back to atlas, under data storage click clusters, CONNECT, 'connect using compass'
7. Copy the connection string, then go back to  MongoDB Compass. 
8. Copy connection string to Compass and click Connect
9. Create a new DB inside the compass
10. Add the csv files as new collections under this DB.
11. after importing csv files I realized that first values are considered as column names(keys).
12. open each CSV files. add a new row to the top. copy paste the firs values. and change the pasted values into keys. Save and exit
13. delete initial collections. do 10th step again but after selecting csv file, set up the data types manually,and then click import. 
14. return to remote (atlas) refresh page.click CLUSTERS > COLLECTIONS
15. See the collections
16. https://docs.atlas.mongodb.com/tutorial/connect-to-your-cluster/#gswa-connect follow this to connect node js to the atlas cluster

17. https://docs.atlas.mongodb.com/tutorial/insert-data-into-your-cluster/  follow this to form basic js configuration for the nodejs 

