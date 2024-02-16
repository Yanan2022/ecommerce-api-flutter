'use strict';

/**
 * profile controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::profile.profile', ({strapi})=>({
    async createMe(ctx) {
        try{
            const user = ctx.state.user;
            if (!user) {
                return ctx.badRequest([{ messages : "No authorized user found"}]);
            }
            const result = await strapi.entityService.create('api::profile.profile',{
                data : {
                    fullName: ctx.request.body.fullName,
                    email: user.email,
                    user: user.id,
                }
            });
            return result;
        }catch(err){
            return ctx.badRequest([{ messages: [{id : 'Error'}] }]);
        }
    },


    async getMe(ctx) {
        try{
            const user = ctx.state.user;
            if (!user) {
                return ctx.badRequest([{ messages : "No authorized user found"}]);
            }
            const result = strapi.db.query('api::profile.profile').findOne({
                where : {
                    user: {
                        id: {
                            $eq: user.id
                        }
                    }
                }, 
                populate: {
                    Image: true,
                }
            })
            return result;
        }catch(err){
            return ctx.badRequest([{ messages: [{id : 'Error'}] }]);
        }
    }
}));
