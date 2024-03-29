export default function CarImg({car,index=0,className=null}) {
    if (!car.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'object-cover';
    }
    return(
        <img className={className} src={'http://localhost:4000/uploads/'+car.photos[index]} alt="" />
    )
}