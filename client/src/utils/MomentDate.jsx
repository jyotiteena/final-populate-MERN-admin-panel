import moment from 'moment'

const MomentDate = (date) => {
    const currentDate = moment(date).format('MMMM Do YYYY');
    return currentDate
}

export default MomentDate