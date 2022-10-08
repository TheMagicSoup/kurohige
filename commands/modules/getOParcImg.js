module.exports = (option,num) => {
    let saga;
    if(option==='m'){
        if(num<101)saga="east blue";
        else if(num>100&&num<218)saga="arabasta";
        else if(num>217&&num<303)saga="sky island";
        else if(num>302&&num<442)saga="water 7";
        else if(num>441&&num<490)saga="thriller bark";
        else if(num>489&&num<598)saga="summit war";
        else if(num>597&&num<654)saga="fishman island";
        else if(num>653&&num<802)saga="dressrosa";
        else if(num>801&&num<909)saga="whole cake island";
        else if(num>908&&num<1058)saga="wano country";
        else saga="final";
    } else {
        if(num<62)saga="east blue";
        else if(num>61&&num<136)saga="arabasta";
        else if(num>135&&num<207)saga="sky island";
        else if(num>206&&num<326)saga="water 7";
        else if(num>325&&num<385)saga="thriller bark";
        else if(num>384&&num<517)saga="summit war";
        else if(num>516&&num<575)saga="fishman island";
        else if(num>574&&num<747)saga="dressrosa";
        else if(num>746&&num<890)saga="whole cake island";
        else saga="wano country";
    }
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