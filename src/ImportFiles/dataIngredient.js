import PropTypes from 'prop-types';

export const dataIngredient =  {
    _id: PropTypes.string.isRequired ,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    flat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
}
