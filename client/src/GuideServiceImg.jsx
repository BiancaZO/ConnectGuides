export default function GuideServiceImg({service, index=0, className=null}){
    if(!service.photos?.length){
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