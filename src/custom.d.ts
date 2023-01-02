// class fusion

// 問題2: 當我使用中間件的時候，對req, res 做了修改以後, 實際上類型並不能改變
// 解決方法: 類型融合(自動)
declare namespace Express {
    interface Request{
        teacherName: string;
    }
}
