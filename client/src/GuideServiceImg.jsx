export default function GudeServiceImg({service, index=0, className=null}){
    if(!service.photos?.lenght){
        return '';
    }
    if(!className){
        className = 'object-cover';

    }
    return(
        <img className={className} src={"http://localhost:4000" + service.photos[index]}
              alt={service.title} />
    );
}