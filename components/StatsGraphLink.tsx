import React from 'react';
import Link from 'next/link';


const StatsGraphLink = () => {
    return (
        <Link
            href="/statsgraph"
            style={{
                marginTop: '0.2em',
                color: 'gray',
                fontSize: '1rem',
                textDecoration: 'underline'
            }}
        >
            View Graph
        </Link>
    );
};

export default StatsGraphLink;