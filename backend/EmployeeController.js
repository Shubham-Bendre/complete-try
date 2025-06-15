exports.getStats = async (req, res) => {
    try {
        const totalChildren = await EmployeeModel.countDocuments();
        const totalParents = await EmployeeModel.distinct('parent_id').length;
        
        res.json({
            totalChildren,
            totalParents
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Error fetching stats' });
    }
}; 