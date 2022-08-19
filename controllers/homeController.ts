import { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Product } from '../models/Product';
import { User } from '../models/User';

export const home = async (req: Request, res: Response)=>{

    let results = await User.findAll({where:{id:1}})
    if(results.length > 0){
        let usuario = results[0]
        usuario.age = 45
        usuario.name ="café"
        await usuario.save()
    }

    await User.destroy({


        where:{
            age:{
                [Op.lte]:18
            }
        }
    })


    

    await User.update({age:18},{
        where:{
            age:{
                [Op.lt]:18

            }
        }
    })

    let users = await User.findAll();
    
    let age: number = 90;
    let showOld: boolean = false;

    if(age > 50) {
        showOld = true;
    }

    let list = Product.getAll();
    let expensiveList = Product.getFromPriceAfter(12);

    res.render('pages/home', {
        name: 'Naruto',
        lastName: 'Uzumaki',
        showOld,
        products: list,
        expensives: expensiveList,
        frasesDoDia: [],
        users
    });
};

export const novoUsuario = async (req:Request, res:Response) =>{

    let name = req.body.name
    let age = req.body.age

    if(name && age){
        const newUser = User.build({
            name,
            age
        })

        await newUser.save()
    }

    res.redirect('/')

}