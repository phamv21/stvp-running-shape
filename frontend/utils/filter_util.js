export function showMyActivities(state){
   let actIds = state.filters.myActivities;
    let activities = actIds.map(id => state.entities.activities[id]);
    return activities;
}