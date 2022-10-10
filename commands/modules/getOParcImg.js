//Defining module
module.exports = (option,num) => {
    //Defining saga
    let saga;
    //For if it's the get-opchapter command
    if(option==='m'){
        //If chapter is 1-100 , store "east blue" in saga
        if(num<101)saga="east blue";
        //If chapter is 101-217, store "arabasta" in saga
        else if(num>100&&num<218)saga="arabasta";
        //If chapter is 218-302, store "sky island" in saga
        else if(num>217&&num<303)saga="sky island";
        //If chapter is 303-441, store "water 7" in saga
        else if(num>302&&num<442)saga="water 7";
        //If chapter is 442-489, store "thriller bark" in saga
        else if(num>441&&num<490)saga="thriller bark";
        //If chapter is 490-597, store "summit war" in saga
        else if(num>489&&num<598)saga="summit war";
        //If chapter is 598-653, store "fishman island" in saga
        else if(num>597&&num<654)saga="fishman island";
        //If chapter is 654-801, store "dressrosa" in saga
        else if(num>653&&num<802)saga="dressrosa";
        //If chapter is 802-908, store "whole cake island" in saga
        else if(num>801&&num<909)saga="whole cake island";
        //If chapter is 909-1057, store "wano country" in saga
        else if(num>908&&num<1058)saga="wano country";
        //Otherwise, store "final" in saga
        else saga="final";
    } else {
        //If episode is 1-61, store "east blue" in saga
        if(num<62)saga="east blue";
        //If episode is 62-135, store "arabasta" in saga
        else if(num>61&&num<136)saga="arabasta";
        //If episode is 136-206, store "sky island" in saga
        else if(num>135&&num<207)saga="sky island";
        //If episode is 207-325, store "water 7" in saga
        else if(num>206&&num<326)saga="water 7";
        //If episode is 326-384, store "thriller bark" in saga
        else if(num>325&&num<385)saga="thriller bark";
        //If episode is 385-516, store "summit war" in saga
        else if(num>384&&num<517)saga="summit war";
        //If episode is 517-574, store "fishman island" in saga
        else if(num>516&&num<575)saga="fishman island";
        //If episode is 575-746, store "dressrosa" in saga
        else if(num>574&&num<747)saga="dressrosa";
        //If episode is 747-889, store "whole cake island" in saga
        else if(num>746&&num<890)saga="whole cake island";
        //Otherwise, store "wano country" in saga
        else saga="wano country";
    }
    //Return different img url based on what's stored in "saga"
    switch(saga){
        case "east blue":
            return "https://nefariousreviews.files.wordpress.com/2020/08/one-piece-featured.jpg";
        case "arabasta":
            return "https://static.wikia.nocookie.net/onepiece/images/0/0b/Arabasta_Arc.png";
        case "sky island":
            return "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/11/Skypiea-One-Pieces-Most-Crucial-Arc.jpg";
        case "water 7":
            return "https://animemiz.files.wordpress.com/2006/09/1085743169_-847270436__1024x768.jpg";
        case "thriller bark":
            return "https://static.wikia.nocookie.net/onepiece/images/5/55/Thriller_Bark_Pirates.png";
        case "summit war":
            return "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/08/Featured-Best-Summit-War-Saga.jpg";
        case "fishman island":
            return "https://static.wikia.nocookie.net/onepiece/images/7/79/Chapter_598.png";
        case "dressrosa":
            return "https://images.squarespace-cdn.com/content/v1/5872c51e5016e169c248c9d7/1607821253645-KNHTFQ0ODVMJHRX2D4S3/image-asset.png";
        case "whole cake island":
            return "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/02/One-Piece-Whole-Cake-Island-Featured-e1614537125273.jpg";
        case "wano country":
            return "https://static.wikia.nocookie.net/onepiece/images/a/a3/Wano_Country_Arc.png";
        case "final":
            return "https://animehunch.com/wp-content/uploads/2021/10/one-piece.jpg";
        default:
            return "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/800px-One_Piece_Logo.svg.png";
    }
        
}