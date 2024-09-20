export function submit(x, y, nv, av ){
    if(x >= 5 && x <= 105 && y >= 450 && y <= 485){
        if(nv === "" && av === ""){
            window.alert("Input Fields are Empty.")
            return
        }

        else if(nv === "" && av != ""){
            window.alert("Name Field is Empty.")
            return
        }

        else if(av === "" && nv != ""){
            window.alert("Age Field is Empty.")
            return;
        }

        if(!isNumber(av)){
            window.alert("AGE HAS TO BE A NUMBER")
            return
        }

        const obj = {
            Name: nv,
            Age: av
        }

        return obj
    }
    else {
        return
    }
}

function isNumber(value) {
    return !isNaN(value);
}
