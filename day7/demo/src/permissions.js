import { AbilityBuilder, createMongoAbility } from "@casl/ability";


export function defineAbilityFor(role){
    const {can,cannot,build} = new AbilityBuilder(createMongoAbility);
    if(role==='admin'){
        can('manage','all');
    }
    else if(role==='manager'){
        can('read', 'Order');
        can('create', 'Order');
        can('edit','Order');
        cannot('delete', 'Order');
    }
    else if(role==='rep'){
        can('read','Order');
        can('create','Order');
    }
    else if(role==='view'){
        can('read','Order')
    }

    return build();
}