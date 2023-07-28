const sequelize = (sequelize, Sequelize)=>{
    const Tutorials= sequelize.define('tutorials', {
        title:{
            type:Sequelize.STRING
        },
        desription:{
            type:Sequelize.STRING

        },
        published:{
            type:Sequelize.STRING

        }
    });
    return Tutorials;
}