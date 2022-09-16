export function showMyActivities(state){
   let actIds = state.filters.myActivities;
   if (actIds != null){
        let activities = actIds.map(id => state.entities.activities[id]);
        return activities;
    }else{
        return [];
    }
}

export const showUserFeed = state => user_id => {
    let activities = state.filters.userFeed[user_id];
    if (activities != null){
        let activitiesArr = Object.values(activities);
        return activitiesArr.sort((a,b)=> b['id']-a['id']);
    }else{
        return [];
    }
}


export const seachedRoutes = state => {
    let routeIds = state.filters.searchedRouteResults
    if(routeIds != null){
        let routes = routeIds.map(id => state.entities.routes[id])
        return routes;
    }else{
        return [];
    }
    
}
