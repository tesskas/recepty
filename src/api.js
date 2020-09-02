export const parse = (data) => {
    return JSON.parse(data.content)
}

export async function callApi(path){
    let response = await fetch("https://damp-springs-19376.herokuapp.com" + path);
    let data = await response.json()
    return data;
}

/** Geters **/
export async function getFoods(){
    let data = await callApi("/food");
    return parse(data);
}

export async function getDetail(name){
    let data = await callApi("/detail/"+ name);
    return parse(data);
}

/**Filter functions **/

export function getByName(data, name){
    return data.forEach( d => {
        if(d.Name === name)
            return d;
    })
}

export function getByCategory(data, categories){
    return data.filter(d => {
        if(categories.includes(d.Category))
            return d;
        return null;
    })
}

export function getByIngredience(data, ingredience){
    let len = ingredience.length;
    return data.filter(d => {
        var n = 0;
        ingredience.forEach(i => {
            if(d.Ingrediences.map(x => x.Name).includes(i))
                n++;
        })
        if(n === len)
            return d;
        return null;
    })
}

export async function removeFood(name){
    let data = await callApi("/delete/"+ name);
    return data;
}

export async function getFilterList(name){
    let data = await callApi("/filter/" + name)
    return data.content;
}
