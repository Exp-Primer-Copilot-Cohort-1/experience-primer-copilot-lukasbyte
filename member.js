function skillsMember()
{
    var member = this;
    member.skills = ["JavaScript", "HTML", "CSS"];
    member.showSkills = function() {
        member.skills.forEach(function(skill) {
            console.log(skill);
        });
    };
}