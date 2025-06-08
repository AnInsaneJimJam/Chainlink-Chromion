import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/card';

function BeneficiaryDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Beneficiary Dashboard</h1>
            <div className="grid gap-4">
                <Card className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Your Inheritances</h2>
                    <p className="text-gray-600">No inheritances found.</p>
                </Card>
            </div>
        </div>
    );
}

export default BeneficiaryDashboard; 