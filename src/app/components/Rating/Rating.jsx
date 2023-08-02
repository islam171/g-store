import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Rating = ({quan}) => {

    let stars = []
    for(let i = 0; i < quan; i++){
        stars.push(i)
    }
    let NoneStars = []
    for(let i = 0; i < 5 - quan; i++){
        NoneStars.push(i)
    }

    return <>
        <div className="rating">
            <div className="stars">
                {
                    stars.map((star) => <div key={star} className="star"><StarIcon /></div>
                    )
                }
                {
                    NoneStars.map((star) => <div key={star} className="star"><StarBorderIcon/></div>
                    )
                }
            </div>
            ({quan})
        </div>

    </>
}

export default Rating