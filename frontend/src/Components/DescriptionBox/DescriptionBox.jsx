import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Nobis quae similique atque repellendus aspernatur qui mollitia 
                inventore suscipit eum minima impedit aperiam fugit voluptas adipisci accusantium numquam delectus, saepe facere!
            </p>
        </div>
    </div>
  )
}

export default DescriptionBox